import { ClassJSXElement, DOMElementJSXElement, FragmentJSXElement, FunctionJSXElement, ObjectJSXElement } from "../types";

export function isDOMOrFragmentElement(
  jsx: ObjectJSXElement | FunctionJSXElement | FragmentJSXElement | ClassJSXElement | DOMElementJSXElement,
): jsx is DOMElementJSXElement | FragmentJSXElement {
  return !jsx.tag || typeof jsx.tag === "object";
}
