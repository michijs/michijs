import type { UnproxifyPort } from "@ports";
import { cloneArray } from "./clone/cloneArray";
import { cloneCommonObject } from "./clone/cloneCommonObject";
import { cloneDate } from "./clone/cloneDate";
import { cloneMap } from "./clone/cloneMap";
import { cloneSet } from "./clone/cloneSet";
import { isProxiedValue } from "../typewards/isProxiedValue";
import { isPrototypeOfObject } from "./isPrototypeOfObject";

/**
 * Converts any proxy into a common value
 */
export function unproxify<T>(val: T): UnproxifyPort<T> {
  const item = isProxiedValue(val) ? val.$value : (val as T);
  if (item && typeof item === "object") {
    if (isPrototypeOfObject(item))
      return cloneCommonObject(item, unproxify) as UnproxifyPort<T>;
    if (Array.isArray(item)) return cloneArray(item, unproxify) as UnproxifyPort<T>;
    if (item instanceof Date) return cloneDate(item) as UnproxifyPort<T>;
    if (item instanceof Map) return cloneMap(item, unproxify) as UnproxifyPort<T>;
    if (item instanceof Set) return cloneSet(item, unproxify) as UnproxifyPort<T>;
  }
  return item as UnproxifyPort<T>;
}
