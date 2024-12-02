import type {
  ClassJSXElement,
  FunctionJSXElement,
  ObjectJSXElement,
} from "../types";

export const isFunctionOrClassJSXElement = (
  jsx: FunctionJSXElement | ClassJSXElement | ObjectJSXElement,
): jsx is ClassJSXElement | FunctionJSXElement => typeof jsx.jsxTag === "function";
