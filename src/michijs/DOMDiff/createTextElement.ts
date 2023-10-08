import { PrimitiveType } from "../types";

export const createTextElement = (jsx: PrimitiveType | {}) =>
  document.createTextNode(
    (typeof jsx === "object" ? JSON.stringify(jsx) : jsx?.toString()) ?? "",
  );
