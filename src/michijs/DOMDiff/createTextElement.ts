import { PrimitiveType } from "../types";

export const createTextElement = (jsx: PrimitiveType | {}) => document.createTextNode(jsx?.toString() ?? '');