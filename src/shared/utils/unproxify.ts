import type { Unproxify } from "../../michijs/types";
import { cloneArray } from "./clone/cloneArray";
import { cloneCommonObject } from "./clone/cloneCommonObject";
import { cloneDate } from "./clone/cloneDate";
import { cloneMap } from "./clone/cloneMap";
import { cloneSet } from "./clone/cloneSet";
import { ProxiedValue } from "../../domain/entities/ProxiedValue";
import { isPrototypeOfObject } from "./isPrototypeOfObject";

/**
 * Converts any proxy into a common value
 */
export function unproxify<T>(val: T): Unproxify<T> {
  const item = val instanceof ProxiedValue ? val.$value : (val as T);
  if (item && typeof item === "object") {
    if (isPrototypeOfObject(item))
      return cloneCommonObject(item, unproxify) as Unproxify<T>;
    if (Array.isArray(item)) return cloneArray(item, unproxify) as Unproxify<T>;
    if (item instanceof Date) return cloneDate(item) as Unproxify<T>;
    if (item instanceof Map) return cloneMap(item, unproxify) as Unproxify<T>;
    if (item instanceof Set) return cloneSet(item, unproxify) as Unproxify<T>;
  }
  return item as Unproxify<T>;
}
