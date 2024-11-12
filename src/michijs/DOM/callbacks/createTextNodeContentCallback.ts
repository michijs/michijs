import type { PrimitiveType } from "../../types";

export const createTextNodeContentCallback = (jsx: PrimitiveType | {}): string => (typeof jsx === "object" ? JSON.stringify(jsx) : jsx?.toString()) ?? "";