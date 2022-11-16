import { CSSObject, StringObjectOf } from "../types";
import { formatToKebabCase } from "../utils";

export function declareCssVariablesRef<T extends CSSObject>(parent = '-'): StringObjectOf<T> {
  return new Proxy({}, {
    get(_, p) {
      if (Symbol.toPrimitive === p)
        return () => `var(${parent})`;

      else
        return declareCssVariablesRef(`${parent}-${formatToKebabCase(p.toString())}`);
    }
  }) as StringObjectOf<T>;
}
