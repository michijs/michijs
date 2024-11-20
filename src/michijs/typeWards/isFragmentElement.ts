import type {
  ClassJSXElement,
  DOMElementJSXElement,
  FragmentJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../types";

export function isFragmentElement(
  jsx:
    | ObjectJSXElement
    | FunctionJSXElement
    | FragmentJSXElement
    | ClassJSXElement
    | DOMElementJSXElement,
): jsx is FragmentJSXElement {
  return !jsx.jsxTag;
}
