import type { ObservableNonNullablePrimitiveType } from "../../types";
import { createTextElement } from "./createTextElement";
import { bindObservable } from "../../utils";
import { GarbageCollectableObject } from "../../classes/GarbageCollectableObject";
import { createTextNodeContentCallback } from "../callbacks/createTextNodeContentCallback";

export const createObservableTextElement = (
  jsx: ObservableNonNullablePrimitiveType,
): Text => {
  const textNode = createTextElement(jsx.valueOf());
  const gc = new GarbageCollectableObject(textNode);
  bindObservable(jsx, (newValue) => gc.ref.nodeValue = createTextNodeContentCallback(newValue))
  return textNode;
};
