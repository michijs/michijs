import { CSSObject, CSSProperty } from "../types";
import { isObservableType } from "./isObservableType";

export function valueIsCSSObject(value: CSSProperty): value is CSSObject {
  // @ts-ignore
  return isObservableType(value) ? valueIsCSSObject(value.$value): value && typeof value === "object" && !value[Symbol.toPrimitive];
  // When value is background: yourvariable
}
