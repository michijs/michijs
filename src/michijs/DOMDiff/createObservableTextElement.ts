import { ObservableNonNullablePrimitiveType } from "../types";
import { createTextElement } from "./createTextElement";

export const createObservableTextElement = (
  jsx: ObservableNonNullablePrimitiveType,
) => {
  const textNode = createTextElement(jsx.valueOf());
  jsx.subscribe?.(
    (newValue) => (textNode.textContent = (typeof newValue === 'object' ? JSON.stringify(newValue) : newValue?.toString()) ?? ""),
  );
  return textNode;
};
