import type { PrimitiveType } from "../../types";
import { createTextNodeContentCallback } from "../callbacks/createTextNodeContentCallback";

export const createTextElement = (jsx: PrimitiveType | {}): Text =>
  document.createTextNode(createTextNodeContentCallback(jsx));
