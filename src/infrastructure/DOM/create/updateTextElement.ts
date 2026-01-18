import type { PrimitiveType } from "../../../domain/ports/types";
import { createTextNodeContentCallback } from "../utils/createTextNodeContentCallback";

export const updateTextElement = (
  clonedNode: Text,
  // This has a lot of performance improvement for some reason
  jsx: PrimitiveType | {},
): void => {
  const newText = createTextNodeContentCallback(jsx);
  // In objects it will be always not correct
  if (clonedNode.nodeValue !== newText) clonedNode.nodeValue = newText;
};
