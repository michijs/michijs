import type { CSSVar } from "../types";

export const isCSSVariable = (value: any): value is CSSVar<string> =>
  value instanceof Function;
