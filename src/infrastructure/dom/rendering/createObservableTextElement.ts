import type { ObservableNonNullablePrimitiveType } from "./types";
import { createTextElement } from "./createTextElement";
import { GarbageCollectableObject } from "@domain";
import { createTextNodeContentCallback } from "./createTextNodeContentCallback";

export const createObservableTextElement = (
  jsx: ObservableNonNullablePrimitiveType,
): Text => {
  // Create text node with current value directly — no need for GC wrapper on initial set.
  const textNode = createTextElement(jsx.valueOf());
  // Subscribe for future updates through GC-safe wrapper.
  const gc = new GarbageCollectableObject(textNode);
  jsx.subscribe(
    (newValue) => (gc.ref.nodeValue = createTextNodeContentCallback(newValue)),
  );
  return textNode;
};
