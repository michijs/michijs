import { GarbageCollectableObject } from "../../classes/GarbageCollectableObject";
import type { ObservableNonNullablePrimitiveType } from "../../types";
import { bindObservable } from "../../utils/bindObservable";
import { createTextNodeContentCallback } from "../callbacks/createTextNodeContentCallback";

export const updateObservableTextElement = (
  clonedNode: Text,
  // This has a lot of performance improvement for some reason
  jsx: ObservableNonNullablePrimitiveType,
): void => {
  const gc = new GarbageCollectableObject(clonedNode);
  // Updates text as soon as binded
  bindObservable(jsx, (newValue) => {
    (gc.ref.nodeValue = createTextNodeContentCallback(newValue))});
};
