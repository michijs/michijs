import { ProxiedValue } from "../..";
import type { Unproxify } from "../types";
import {
  cloneArray,
  cloneCommonObject,
  cloneDate,
  cloneMap,
  cloneSet,
} from "./clone";

/**
 * Converts any proxy into a common value
 */
export function unproxify<T>(val: T): Unproxify<T> {
  const item = val instanceof ProxiedValue ? val.$value : (val as T);
  if (item && typeof item === "object") {
    if (Array.isArray(item)) return cloneArray(item, unproxify) as Unproxify<T>;
    if (item instanceof Date) return cloneDate(item) as Unproxify<T>;
    if (item instanceof Map) return cloneMap(item, unproxify) as Unproxify<T>;
    if (item instanceof Set) return cloneSet(item, unproxify) as Unproxify<T>;
    if (Object.getPrototypeOf(item) === Object.prototype)
      return cloneCommonObject(item, unproxify) as Unproxify<T>;
    return item as Unproxify<T>;
  }
  return item as Unproxify<T>;
}
