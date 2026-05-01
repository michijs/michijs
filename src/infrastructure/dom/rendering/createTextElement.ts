import type { PrimitiveType } from "#shared";
import { createTextNodeContentCallback } from "./createTextNodeContentCallback";

export const createTextElement = (jsx: PrimitiveType | {}): Text =>
  document.createTextNode(createTextNodeContentCallback(jsx));
