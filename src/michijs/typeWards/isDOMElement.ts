import type {
  ClassJSXElement,
  DOMElementJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../types";

export function isDOMElement(
  jsx:
    | ObjectJSXElement
    | FunctionJSXElement
    | ClassJSXElement
    | DOMElementJSXElement,
): jsx is DOMElementJSXElement {
  return typeof jsx.jsxTag === "object";
}
