import type { Unproxify } from "../types";
import { cloneArray } from "./clone/cloneArray";
import { cloneCommonObject } from "./clone/cloneCommonObject";
import { cloneDate } from "./clone/cloneDate";
import { cloneMap } from "./clone/cloneMap";
import { cloneSet } from "./clone/cloneSet";
import { ProxiedValue } from "../../michijs/classes/ProxiedValue";

/**
 * Converts any proxy into a common value
 */
export function unproxify<T>(val: T): Unproxify<T> {
  const item = val instanceof ProxiedValue ? val.$value : (val as T);
  if (item) {
    if (typeof item === "object") {
      if (Array.isArray(item))
        return cloneArray(item, unproxify) as Unproxify<T>;
      if (item instanceof Date) return cloneDate(item) as Unproxify<T>;
      if (item instanceof Map) return cloneMap(item, unproxify) as Unproxify<T>;
      if (item instanceof Set) return cloneSet(item, unproxify) as Unproxify<T>;
      if (Object.getPrototypeOf(item) === Object.prototype)
        return cloneCommonObject(item, unproxify) as Unproxify<T>;
    }
  }
  return item as Unproxify<T>;
}
