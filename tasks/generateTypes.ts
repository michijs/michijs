import {
  supportedHTMLElements,
  supportedMathMLElements,
  supportedSVGElements,
} from "@michijs/htmltype/supported";
import { generateTypes } from "@michijs/htmltype/bin";
import {
  writeFileSync,
  rmSync,
  cpSync,
  readdirSync,
  statSync,
  readFileSync,
  renameSync,
} from "node:fs";
import path from "node:path";

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

function renameFiles(directory) {
  // Read the contents of the directory
  const files = readdirSync(directory);

  // Iterate through each file in the directory
  files.forEach((file) => {
    const filePath = path.join(directory, file);

    // Check if it's a directory
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      // If it's a directory, recursively call the function
      renameFiles(filePath);
    } else if (file.endsWith(".d.ts")) {
      // If it's a .d.ts file, rename it to .ts
      const newFilePath = path.join(directory, file.replace(".d.ts", ".ts"));
      renameSync(filePath, newFilePath);

      // Read the contents of the file
      const fileContent = readFileSync(newFilePath, "utf-8");

      // Remove the line "export {};"
      const modifiedContent = fileContent.replace(/export\s*\{\s*\};\n/, "");

      // Write the modified content back to the file
      writeFileSync(newFilePath, modifiedContent);
    }
  });
}

cpSync(
  "./node_modules/@michijs/htmltype/dist",
  "src/michijs/generated/htmlType",
  { force: true, recursive: true },
);
renameFiles("src/michijs/generated/htmlType");

generateTypes({
  generateAttributesAndValueSetsProps: {
    valueSetsTransformer(valueSets) {
      valueSets.attributes.forEach((attribute) => {
        attribute.values = [
          {
            name: `ObservableOrConst<${attribute.values ? attribute.values
              .map((x) => x.name)
              .concat("undefined")
              .join(" | "): "undefined"}>`,
          },
        ];
      });
    },
    valueSetsAdditionalImports: [
      'import type { ObservableOrConst } from "../../../types"',
    ],
  },
  typesFactoryProps: {
    generatedPath: "src/michijs/generated/htmlType/generated",
  },
  elements: {
    additionalImports: [
      'import type { MichiAttributes } from "../../../types"',
    ],
    additionalExtends: (el, elementInterface) => [
      `MichiAttributes<I["${el}"] extends Element ? I["${el}"]: ${elementInterface}>`,
    ],
  },
});

try {
  rmSync("./src/michijs/generated/JSX.ts", { recursive: true, force: true });
} catch {}

const interfaceOverrideElements = Array.from(elements).filter(
  ([_name, x]) => x.elementInterfaces.length > 1,
);

writeFileSync(
  "./src/michijs/generated/JSX.ts",
  ` import type { HTMLElements as HTMLElementsHTMLType, MathMLElements, SVGElements as SVGElementsHTMLType } from "./htmlType";
  import type { SingleJSXElement } from '../types';

  interface ElementsInterfaceOverride {
    ${interfaceOverrideElements
      .map(([name, x]) => `${name}: ${x.elementInterfaces.join(" & ")}`)
      .join(",\n")}
  }
  type HTMLElements = HTMLElementsHTMLType<ElementsInterfaceOverride>;
  type SVGElements = SVGElementsHTMLType<ElementsInterfaceOverride>;

  declare global {
    namespace JSX {
      type Element = SingleJSXElement
      interface ElementChildrenAttribute {
        children: SingleJSXElement; // specify children name to use
      }
      // interface IntrinsicAttributes {
      //   children?: SingleJSXElement;
      // }
      interface IntrinsicElements extends HTMLElements, MathMLElements, SVGElements {
        ${interfaceOverrideElements
          .sort()
          .map(([key, { attributes }]) => `${key}: ${attributes.join(" & ")};`)
          .join("\n")}
      }
    }
  }`,
);
