import { ClassJSXElement, FunctionJSXElement } from "../types";

export function isClassJSXElement(
  param: FunctionJSXElement | ClassJSXElement,
): param is ClassJSXElement {
  return "tag" in param.tag;
}
