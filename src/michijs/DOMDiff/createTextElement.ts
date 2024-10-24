import type { PrimitiveType } from "../types";

export const createTextElement = (jsx: PrimitiveType | {}): Text =>
  document.createTextNode(
    (typeof jsx === "object" ? JSON.stringify(jsx) : jsx?.toString()) ?? "",
  );
