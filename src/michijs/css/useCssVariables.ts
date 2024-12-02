import type { CssVariablesObject, AnyObject } from "../types";
import { formatToKebabCase } from "../utils/formatToKebabCase";

const getProxyGetter = <T>(parent = "-") =>
  new Proxy(Function as unknown as CssVariablesObject<T>, {
    apply(_, _2, args) {
      const defaultValue = args[0];
      return `var(${parent}${
        defaultValue !== undefined ? `,${defaultValue}` : ""
      })`;
    },
    get(_, p) {
      if (Symbol.toPrimitive === p) return () => parent;
      if (p === "valueOf") return () => parent;
      if (p !== "subscribe")
        return getProxyGetter(`${parent}-${formatToKebabCase(p.toString())}`);
    },
  }) as CssVariablesObject<T>;

export const useCssVariables = <T extends AnyObject>(): CssVariablesObject<T> =>
  getProxyGetter<T>();
