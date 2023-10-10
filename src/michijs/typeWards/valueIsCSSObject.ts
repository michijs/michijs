import { CSSObject, CSSProperty } from "../types";
import { isObservableType } from "./isObservableType";

export function valueIsCSSObject(value: CSSProperty): value is CSSObject {
  return Boolean(isObservableType(value)
  // @ts-ignore
    ? valueIsCSSObject(value.$value)
    : value && typeof value === "object" && !value[Symbol.toPrimitive]);
  // When value is background: yourvariable
}
