import { Observable } from "../classes";
import type { CSSVar } from "../types";

export const isCSSVariable = (value: any): value is CSSVar<string> =>
  typeof value === "function" && !value.compute;
