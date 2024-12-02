import type { CSSObject, CSSProperty } from "../types";

export const valueIsCSSObject = (value: CSSProperty): value is CSSObject => Boolean(
  // When value is background: yourvariable
  value && typeof value === "object" && !value[Symbol.toPrimitive],
);
