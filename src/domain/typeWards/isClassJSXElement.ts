import type { ClassJSXElement, FunctionJSXElement } from "../../michijs/types";

export const isClassJSXElement = (
  param: FunctionJSXElement | ClassJSXElement,
): param is ClassJSXElement => "tag" in param.jsxTag.valueOf();
