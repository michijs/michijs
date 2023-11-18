import { CSSObject, CSSProperty } from "../types";

export function valueIsCSSObject(value: CSSProperty): value is CSSObject {
  return Boolean(value && typeof value === "object" && !value[Symbol.toPrimitive]);
  // When value is background: yourvariable
}
