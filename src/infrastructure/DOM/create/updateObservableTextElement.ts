import { GarbageCollectableObject } from "../../../domain/entities/GarbageCollectableObject";
import type { ObservableNonNullablePrimitiveType } from "../../../domain/ports/types";
import { bindObservable } from "../../utils/bindObservable";
import { createTextNodeContentCallback } from "../utils/createTextNodeContentCallback";

export const updateObservableTextElement = (
  clonedNode: Text,
  // This has a lot of performance improvement for some reason
  jsx: ObservableNonNullablePrimitiveType,
): void => {
  const gc = new GarbageCollectableObject(clonedNode);
  // Updates text as soon as binded
  bindObservable(jsx, (newValue) => {
    gc.ref.nodeValue = createTextNodeContentCallback(newValue);
  });
};
