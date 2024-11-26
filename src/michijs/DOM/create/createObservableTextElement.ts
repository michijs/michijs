import type { ObservableNonNullablePrimitiveType } from "../../types";
import { overrideCallbackWithRef } from "../../utils/overrideCallbackWithRef";
import { createTextElement } from "./createTextElement";
import { updateTextCallback } from "../callbacks/updateTextCallback";

export const createObservableTextElement = (
  jsx: ObservableNonNullablePrimitiveType,
): Text => {
  const textNode = createTextElement(jsx());
  overrideCallbackWithRef(jsx, textNode, updateTextCallback);
  return textNode;
};
