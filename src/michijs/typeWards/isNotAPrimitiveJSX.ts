import type {
  ArrayJSXElement,
  ClassJSXElement,
  DOMElementJSXElement,
  FragmentJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
  ObservableNonNullablePrimitiveType,
  SingleJSXElement,
} from "../types";

export const isNotAPrimitiveJSX = (
  jsx: SingleJSXElement,
): jsx is
  | FunctionJSXElement
  | ClassJSXElement
  | ObjectJSXElement
  | FragmentJSXElement
  | DOMElementJSXElement
  | ArrayJSXElement
  | Node
  | ObservableNonNullablePrimitiveType => typeof jsx === "object";
