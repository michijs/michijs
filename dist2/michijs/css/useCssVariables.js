import { formatToKebabCase } from "../utils";

/**
 * @typedef {import('../types').CssVariablesObject} CssVariablesObject
 * @typedef {import('../types').AnyObject} AnyObject
 */

/**
 * @template T
 * @returns {*}
 */
function getProxyGetter(parent = "-") {
  return new Proxy(Function, {
    apply(_, _2, args) {
      const defaultValue = args[0];
      return `var(${parent}${defaultValue !== undefined ? `,${defaultValue}` : ""})`;
    },
    get(_, p) {
      if (Symbol.toPrimitive === p) return () => parent;
      if (p === "valueOf") return () => parent;
      if (p !== "subscribe")
        return getProxyGetter(`${parent}-${formatToKebabCase(p.toString())}`);
    },
  });
}

/**
 * @template {AnyObject} T
 * @returns {CssVariablesObject<T>}
 */
export function useCssVariables() {
  return getProxyGetter();
}
