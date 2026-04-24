import {
  supportedHTMLElements,
  supportedMathMLElements,
  supportedSVGElements,
} from "@michijs/htmltype/supported";
import { generateTypes } from "../node_modules/@michijs/htmltype/bin/tasks/index.js";
import {
  writeFileSync,
  rmSync,
  cpSync,
  readdirSync,
  statSync,
  readFileSync,
  renameSync,
  mkdirSync,
} from "node:fs";
import path from "node:path";

const generatedPath = "src/infrastructure/node/jsx-runtime/generated";
const htmlTypePath = `${generatedPath}/htmlType`;
const htmlTypeGeneratedPath = `${htmlTypePath}/generated`;

const elements = new Map<
  string,
  {
    attributes: string[];
    elementInterfaces: string[];
  }
>();

supportedHTMLElements.forEach((x) => {
  elements.set(x.tagName, {
    attributes: [`HTMLElements["${x.tagName}"]`],
    elementInterfaces: [x.elementInterface],
  });
});
supportedMathMLElements.forEach((x) => {
  elements.set(x.tagName, {
    attributes: [`MathMLElements["${x.tagName}"]`],
    elementInterfaces: [x.elementInterface],
  });
});
supportedSVGElements.forEach((x) => {
  const attributes = `SVGElements["${x.tagName}"]`;
  const elementInterface = x.elementInterface;
  const element = elements.get(x.tagName);
  if (element) {
    element.attributes.push(attributes);
    element.elementInterfaces.push(elementInterface);
  } else {
    elements.set(x.tagName, {
      attributes: [attributes],
      elementInterfaces: [x.elementInterface],
    });
  }
});

function renameFiles(directory: string) {
  const files = readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      renameFiles(filePath);
    } else if (file.endsWith(".d.ts")) {
      const newFilePath = path.join(directory, file.replace(".d.ts", ".ts"));
      renameSync(filePath, newFilePath);

      const fileContent = readFileSync(newFilePath, "utf-8");
      const modifiedContent = fileContent.replace(/export\s*\{\s*\};\n/, "");
      writeFileSync(newFilePath, modifiedContent);
    }
  });
}

// Clean and recreate the generated directory
try {
  rmSync(generatedPath, { recursive: true, force: true });
} catch {}
mkdirSync(generatedPath, { recursive: true });

// Copy base htmltype files
cpSync("./node_modules/@michijs/htmltype/dist/src", htmlTypePath, {
  force: true,
  recursive: true,
});
renameFiles(htmlTypePath);

// Generate types without MichiAttributes, Events, or Observables.
// Values are plain strings — no ObservableOrConstOrPromise wrappers.
generateTypes({
  generateAttributesAndValueSetsProps: {
    // No transformer — keep ValueSets as plain union types (string literals)
  },
  typesFactoryProps: {
    generatedPath: htmlTypeGeneratedPath,
  },
  elements: {
    // No additionalImports or additionalExtends — no MichiAttributes
  },
});

// Post-process Events directory for Node SSR:
// Replace all typed event handler function signatures with plain `string` attributes.
// In Node SSR, events like onclick="doSomething()" are just string attributes.
const eventsPath = `${htmlTypePath}/Events`;

// 1. Rewrite AllEvents.ts — replace all typed handlers with `string?`
const allEventsPath = `${eventsPath}/AllEvents.ts`;
let allEventsContent = readFileSync(allEventsPath, "utf-8");
// Remove all import lines
allEventsContent = allEventsContent.replace(/^import type .*;\n/gm, "");
// Replace method signatures: onxxx?(ev: TypedXxxEvent<T>): unknown; → onxxx?: string;
allEventsContent = allEventsContent.replace(
  /(\s+)(on\w+)\?\(ev: \w+<T>(?:.*?)\): unknown;/g,
  "$1$2?: string;",
);
// Replace onerror special case: onerror?: TypedOnErrorEventHandler<T>;
allEventsContent = allEventsContent.replace(
  /(\s+)(on\w+)\?: \w+<T>;/g,
  "$1$2?: string;",
);
writeFileSync(allEventsPath, allEventsContent);

// 2. Remove TypedEvents/ and TypedEventHandlers/ directories (no longer needed)
rmSync(`${eventsPath}/TypedEvents`, { recursive: true, force: true });
rmSync(`${eventsPath}/TypedEventHandlers`, { recursive: true, force: true });

// 3. Remove TypedElementEvent.ts and TypedDocumentAndElementEventHandlers.ts
// (they Pick from AllEvents, but SVGEvents and MathMLEvents extend them —
//  we need to keep them but remove the separate files that import AllEvents)
// Actually, these are small files that just Pick from AllEvents — they still work fine.

// 4. Update Events/index.ts to remove TypedEvents and TypedEventHandlers exports
const eventsIndexPath = `${eventsPath}/index.ts`;
let eventsIndexContent = readFileSync(eventsIndexPath, "utf-8");
eventsIndexContent = eventsIndexContent
  .replace(/export \* from "\.\/TypedEvents";\n?/, "")
  .replace(
    /export \* from "\.\/TypedEventHandlers\/TypedOnErrorEventHandler";\n?/,
    "",
  );
writeFileSync(eventsIndexPath, eventsIndexContent);

// Generate JSX.ts for Node (Element = string, no MichiAttributes, no SingleJSXElement)
try {
  rmSync(`${generatedPath}/JSX.ts`, { recursive: true, force: true });
} catch {}

const interfaceOverrideElements = Array.from(elements).filter(
  ([_name, x]) => x.elementInterfaces.length > 1,
);

writeFileSync(
  `${generatedPath}/JSX.ts`,
  `import type { HTMLElements as HTMLElementsHTMLType, MathMLElements, SVGElements as SVGElementsHTMLType } from "./htmlType";

interface ElementsInterfaceOverride {
  ${interfaceOverrideElements
    .map(([name, x]) => `${name}: ${x.elementInterfaces.join(" & ")}`)
    .join(",\n  ")}
}
type HTMLElements = HTMLElementsHTMLType<ElementsInterfaceOverride>;
type SVGElements = SVGElementsHTMLType<ElementsInterfaceOverride>;

declare global {
  namespace JSX {
    type Element = string
    interface ElementChildrenAttribute {
      children: string;
    }
    interface IntrinsicElements extends HTMLElements, MathMLElements, SVGElements {
      ${interfaceOverrideElements
        .sort()
        .map(([key, { attributes }]) => `${key}: ${attributes.join(" & ")};`)
        .join("\n      ")}
    }
  }
}
`,
);
