import type { ObservableNonNullablePrimitiveType } from "../types";
import { overrideCallbackWithRef } from "../utils/overrideCallbackWithRef";
import { createTextElement } from "./createTextElement";

export const createObservableTextElement = (
  jsx: ObservableNonNullablePrimitiveType,
) => {
  const textNode = createTextElement(jsx.$value);
  overrideCallbackWithRef(
    textNode,
    jsx,
    (newValue, el) =>
      (el.textContent =
        (typeof newValue === "object"
          ? JSON.stringify(newValue)
          : newValue?.toString()) ?? ""),
  );
  return textNode;
};
