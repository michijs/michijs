import type {
  ClassJSXElement,
  DOMElementJSXElement,
  FragmentJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../types";

export function isDOMOrFragmentElement(
  jsx:
    | ObjectJSXElement
    | FunctionJSXElement
    | FragmentJSXElement
    | ClassJSXElement
    | DOMElementJSXElement,
): jsx is DOMElementJSXElement | FragmentJSXElement {
  return !jsx.jsxTag || typeof jsx.jsxTag === "object";
}
