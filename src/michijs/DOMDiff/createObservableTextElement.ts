import type { ObservableNonNullablePrimitiveType } from "../types";
import { overrideCallbackWithRef } from "../utils/overrideCallbackWithRef";
import { createTextElement } from "./createTextElement";

const updateTextCallback = (newValue: unknown, el: Text) =>
  (el.nodeValue =
    (typeof newValue === "object"
      ? JSON.stringify(newValue)
      : newValue?.toString()) ?? "");

export const createObservableTextElement = (
  jsx: ObservableNonNullablePrimitiveType,
): Text => {
  const textNode = createTextElement(jsx.$value);
  overrideCallbackWithRef(jsx, textNode, updateTextCallback);
  return textNode;
};
