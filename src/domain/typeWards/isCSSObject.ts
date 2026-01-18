import type { CSSObject, CSSProperty } from "../../michijs/types";

export const isCSSObject = (value: CSSProperty): value is CSSObject =>
  Boolean(
    // When value is background: yourvariable
    value && typeof value === "object" && !value[Symbol.toPrimitive],
  );
