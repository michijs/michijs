import { CssDeclaration, AnyObject } from "../types";
import { formatToKebabCase } from "../utils";

export function declareCssVariables<T extends AnyObject>(parent = '-'): CssDeclaration<T> {
  return new Proxy({}, {
    get(_, p) {
      if (Symbol.toPrimitive === p)
        return () => parent;
      else if(p === 'var') {
        return (defaultValue) => `var(${parent}${defaultValue !== undefined ? `,${defaultValue}`: ''})`
      } else if (parent[p]) {
        if (typeof parent[p] === 'function')
          return (...a) => parent[p](...a);
        else
          return parent[p]
      } else
        return declareCssVariables(`${parent}-${formatToKebabCase(p.toString())}`);
    }
  }) as CssDeclaration<T>;
}
