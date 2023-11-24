import { ObservableValue, ProxiedValueInterface } from "../types";
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
export function unproxify<
  T,
  Y = T extends ObservableValue<infer Z, unknown> ? Z : T,
>(val: T): Y {
  const item =
    (val as ProxiedValueInterface<T, T> | undefined)?.$value ?? (val as T);
  if (item && typeof item === "object") {
    if (item instanceof Array) return cloneArray(item, unproxify) as Y;
    if (item instanceof Date) return cloneDate(item) as Y;
    if (item instanceof Map) return cloneMap(item, unproxify) as Y;
    if (item instanceof Set) return cloneSet(item, unproxify) as Y;
    if (Object.getPrototypeOf(item) === Object.prototype)
      return cloneCommonObject(item, unproxify) as Y;
  }
  return item as unknown as Y;
}
