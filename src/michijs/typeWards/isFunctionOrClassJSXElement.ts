import type {
  ClassJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../types";

export function isFunctionOrClassJSXElement(
  jsx: FunctionJSXElement | ClassJSXElement | ObjectJSXElement,
): jsx is ClassJSXElement | FunctionJSXElement {
  return typeof jsx.jsxTag === "function";
}
