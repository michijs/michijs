import { CssDeclaration, AnyObject } from "../types";
import { formatToKebabCase } from "../utils";

function getProxyGetter<T>(defaultValues: T, parent = "-") {
  return new Proxy(
    {},
    {
      get(_, p) {
        if (Symbol.toPrimitive === p) return () => parent;
        else if (p === "var") {
          return (defaultValue) =>
            `var(${parent}${
              defaultValue !== undefined ? `,${defaultValue}` : ""
            })`;
          // When having a variable called like a function its broken
          // } else if (parent[p]) {
          //   if (typeof parent[p] === 'function')
          //     return (...a) => parent[p](...a);
          //   else
          //     return parent[p]
        }
        if (p === "valueOf") return () => parent;
        else if (defaultValues[p])
          return getProxyGetter(
            defaultValues[p],
            `${parent}-${formatToKebabCase(p.toString())}`,
          );
      },
    },
  ) as CssDeclaration<T>;
}

export function useCssVariablesDeclaration<T extends AnyObject>(
  defaultValues: T,
): CssDeclaration<T> {
  return getProxyGetter(defaultValues);
}

export function useCssVariables<T extends AnyObject>(
  defaultValues: T,
): [CssDeclaration<T>, T] {
  return [useCssVariablesDeclaration<T>(defaultValues), defaultValues];
}
