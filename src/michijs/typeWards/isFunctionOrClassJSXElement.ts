import type {
  ClassJSXElement,
  DOMElementJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../types";

export const isFunctionOrClassJSXElement = (
  jsx: FunctionJSXElement | ClassJSXElement | ObjectJSXElement | DOMElementJSXElement,
): jsx is ClassJSXElement | FunctionJSXElement =>
  typeof jsx.jsxTag === "function";
