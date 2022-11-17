import { CSSObject, StringObjectOf } from "../types";
import { formatToKebabCase } from "../utils";

export function declareCssVariablesRef<T extends CSSObject>(parent = '-'): StringObjectOf<T> {
  return new Proxy({}, {
    get(_, p) {
      if (Symbol.toPrimitive === p)
        return () => `var(${parent})`;
      else if (parent[p]) {
        if (typeof parent[p] === 'function')
          return (...a) => parent[p](...a);
        else
          return parent[p]
      } else
        return declareCssVariablesRef(`${parent}-${formatToKebabCase(p.toString())}`);
    }
  }) as StringObjectOf<T>;
}
