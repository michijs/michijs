import type { PrimitiveType } from "../../../michijs/types";
import { createTextNodeContentCallback } from "../utils/createTextNodeContentCallback";

export const createTextElement = (jsx: PrimitiveType | {}): Text =>
  document.createTextNode(createTextNodeContentCallback(jsx));
