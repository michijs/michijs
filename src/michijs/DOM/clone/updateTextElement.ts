import type { PrimitiveType } from "../../types";
import { createTextNodeContentCallback } from "../callbacks/createTextNodeContentCallback";
import { updateTextCallback } from "../callbacks/updateTextCallback";

export const updateTextElement = (
  clonedNode: Text,
  // This has a lot of performance improvement for some reason
  jsx: PrimitiveType | {},
): void => {
  const newText = createTextNodeContentCallback(jsx);
  // In objects it will be always not correct
  if (clonedNode.nodeValue !== newText)
    updateTextCallback(jsx, clonedNode, newText);
};
