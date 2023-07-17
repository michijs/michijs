import {
  supportedHTMLElements,
  supportedMathMLElements,
  supportedSVGElements,
} from "@michijs/htmltype/supported";
import { writeFileSync, rmSync, mkdirSync } from "fs";

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

rmSync("./src/michijs/h/generated", { recursive: true, force: true });
mkdirSync("./src/michijs/h/generated");

writeFileSync(
  "./src/michijs/h/generated/JSX.ts",
  ` import { HTMLElements as HTMLElementsHTMLType, MathMLElements, SVGElements as SVGElementsHTMLType } from "@michijs/htmltype";
  import { MichiAttributes } from "../MichiAttributes";
  import { SingleJSXElement } from '../../types';

  interface ElementsInterfaceOverride {
    ${Array.from(elements)
      .filter(([_name, x]) => x.elementInterfaces.length > 1)
      .map(([name, x]) => `${name}: ${x.elementInterfaces.join(" & ")}`)
      .join(",\n")}
  }
  type HTMLElements = HTMLElementsHTMLType<ElementsInterfaceOverride>;
  type SVGElements = SVGElementsHTMLType<ElementsInterfaceOverride>;

  declare global {
    namespace JSX {
      type Element = SingleJSXElement;
      interface ElementChildrenAttribute {
        children: SingleJSXElement; // specify children name to use
      }
      interface IntrinsicAttributes {
        children?: SingleJSXElement;
      }
      interface IntrinsicElements extends HTMLElements, MathMLElements, SVGElements {
        ${Array.from(elements)
          .sort()
          .map(
            ([key, { attributes, elementInterfaces }]) =>
              `${key}: ${attributes.join(
                " & ",
              )} & MichiAttributes<${elementInterfaces.join(" & ")}>;`,
          )
          .join("\n")}
      }
    }
  }`,
);
