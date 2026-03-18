import type { PrimitiveType } from "@shared";

export const createTextNodeContentCallback = (
  jsx: PrimitiveType | {},
): string =>
  (typeof jsx === "object" ? JSON.stringify(jsx) : jsx?.toString()) ?? "";
