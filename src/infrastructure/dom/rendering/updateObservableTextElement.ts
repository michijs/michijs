import { GarbageCollectableObject } from "#domain";
import type { ObservableNonNullablePrimitiveType } from "./types";
import { createTextNodeContentCallback } from "./createTextNodeContentCallback";

export const updateObservableTextElement = (
  clonedNode: Text,
  // This has a lot of performance improvement for some reason
  jsx: ObservableNonNullablePrimitiveType,
): void => {
  // Set initial value directly — the node is guaranteed alive at this point.
  clonedNode.nodeValue = createTextNodeContentCallback(jsx.valueOf());
  // Subscribe for future updates through GC-safe wrapper.
  const gc = new GarbageCollectableObject(clonedNode);
  jsx.subscribe((newValue) => {
    gc.ref.nodeValue = createTextNodeContentCallback(newValue);
  });
};
