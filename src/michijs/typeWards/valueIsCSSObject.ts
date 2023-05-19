import { CSSObject, CSSProperty } from "../types";

export function valueIsCSSObject(value: CSSProperty): value is CSSObject {
  // @ts-ignore
  return value && typeof value === "object" && !value[Symbol.toPrimitive];
  // When value is background: yourvariable
}
