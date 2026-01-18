import type { CSSVar } from "../../michijs/types";

export const isCSSVariable = (value: any): value is CSSVar<string> =>
  value instanceof Function;
