import {
  ClassJSXElement,
  DOMElementJSXElement,
  FragmentJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
  ObservableNonNullablePrimitiveType,
  SingleJSXElement,
} from "../types";

export function isNotAPrimitiveJSX(
  jsx: SingleJSXElement,
): jsx is
  | FunctionJSXElement
  | ClassJSXElement
  | ObjectJSXElement
  | FragmentJSXElement
  | DOMElementJSXElement
  | Node
  | ObservableNonNullablePrimitiveType {
  return typeof jsx === "object";
}
