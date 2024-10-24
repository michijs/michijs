import type { ObservableNonNullablePrimitiveType } from "../types";
import { overrideCallbackWithRef } from "../utils/overrideCallbackWithRef";
import { createTextElement } from "./createTextElement";

export const createObservableTextElement = (
  jsx: ObservableNonNullablePrimitiveType,
): Text => {
  const textNode = createTextElement(jsx.$value);
  overrideCallbackWithRef(
    jsx,
    textNode,
    (newValue, el) =>
      (el.textContent =
        (typeof newValue === "object"
          ? JSON.stringify(newValue)
          : newValue?.toString()) ?? ""),
  );
  return textNode;
};
