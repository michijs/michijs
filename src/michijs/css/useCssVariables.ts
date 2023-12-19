import { CssDeclaration, AnyObject } from "../types";
import { formatToKebabCase } from "../utils";

function getProxyGetter<T>(parent = "-") {
  return new Proxy(
    Function as unknown as CssDeclaration<T>,
    {
      apply(_, _2, args){
        const defaultValue = args[0];
        return `var(${parent}${
          defaultValue !== undefined ? `,${defaultValue}` : ""
        })`
      },
      get(_, p) {
        if (Symbol.toPrimitive === p) return () => parent;
        else if (p === "valueOf") return () => parent;
        else if (p !== "subscribe")
          return getProxyGetter(`${parent}-${formatToKebabCase(p.toString())}`);
      },
    },
  ) as CssDeclaration<T>;
}

export function useCssVariablesDeclaration<
  T extends AnyObject,
>(): CssDeclaration<T> {
  return getProxyGetter<T>();
}

export function useCssVariables<T extends AnyObject>(
  defaultValues: T,
): [CssDeclaration<T>, T] {
  return [getProxyGetter<T>(), defaultValues];
}
