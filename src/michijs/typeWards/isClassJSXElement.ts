import type { ClassJSXElement, FunctionJSXElement } from "../types";

export function isClassJSXElement(
  param: FunctionJSXElement | ClassJSXElement,
): param is ClassJSXElement {
  return "tag" in param.jsxTag.valueOf();
}
