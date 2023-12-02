import { ProxiedValueInterface, Unproxify } from "../types";
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
  const item =
    (val as ProxiedValueInterface<T, T> | undefined)?.$value ?? (val as T);
  if (item && typeof item === "object") {
    if (item instanceof Array)
      return cloneArray(item, unproxify) as Unproxify<T>;
    if (item instanceof Date) return cloneDate(item) as Unproxify<T>;
    if (item instanceof Map) return cloneMap(item, unproxify) as Unproxify<T>;
    if (item instanceof Set) return cloneSet(item, unproxify) as Unproxify<T>;
    if (Object.getPrototypeOf(item) === Object.prototype)
      return cloneCommonObject(item, unproxify) as Unproxify<T>;
  }
  return item as Unproxify<T>;
}
