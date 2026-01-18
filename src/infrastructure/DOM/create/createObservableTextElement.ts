import type { ObservableNonNullablePrimitiveType } from "../../../domain/ports/types";
import { createTextElement } from "./createTextElement";
import { bindObservable } from "../../../shared/utils";
import { GarbageCollectableObject } from "../../../domain/entities/GarbageCollectableObject";
import { createTextNodeContentCallback } from "../utils/createTextNodeContentCallback";

export const createObservableTextElement = (
  jsx: ObservableNonNullablePrimitiveType,
): Text => {
  const textNode = createTextElement(jsx.valueOf());
  const gc = new GarbageCollectableObject(textNode);
  bindObservable(
    jsx,
    (newValue) => (gc.ref.nodeValue = createTextNodeContentCallback(newValue)),
  );
  return textNode;
};
