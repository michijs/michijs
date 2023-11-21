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
  stat,
  renameSync,
} from "fs";
import path from "path";

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
    stat(filePath, (err, stats) => {
      if (err) {
        console.error(`Error stating file ${filePath}: ${err}`);
        return;
      }

      if (stats.isDirectory()) {
        // If it's a directory, recursively call the function
        renameFiles(filePath);
      } else if (file.endsWith(".d.ts")) {
        // If it's a .d.ts file, rename it to .ts
        const newFilePath = path.join(directory, file.replace(".d.ts", ".ts"));

        renameSync(filePath, newFilePath);
      }
    });
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
        attribute.values?.push({
          name: `ObservableLike<${attribute.values
            .map((x) => x.name)
            .concat("undefined")
            .join(" | ")}>`,
        });
      });
    },
    valueSetsAdditionalImports: [
      'import { ObservableLike } from "../../../types"',
    ],
  },
  typesFactoryProps: {
    generatedPath: "src/michijs/generated/htmlType/generated",
  },
  elements: {
    additionalImports: ['import { MichiAttributes } from "../../../types"'],
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
  ` import { HTMLElements as HTMLElementsHTMLType, MathMLElements, SVGElements as SVGElementsHTMLType } from "./htmlType";
  import { SingleJSXElement } from '../types';

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
