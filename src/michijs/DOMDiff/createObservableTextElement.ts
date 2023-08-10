import { ObservableNonNullablePrimitiveType } from "../types";
import { createTextElement } from "./createTextElement";

export const createObservableTextElement = (
  jsx: ObservableNonNullablePrimitiveType,
) => {
  const textNode = createTextElement(jsx);
  jsx.subscribe?.(
    (newValue) => (textNode.textContent = newValue?.toString() ?? ""),
  );
  return textNode;
};
