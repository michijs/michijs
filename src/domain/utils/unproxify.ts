import type { UnproxifyPort } from "@ports";
import { cloneArray } from "../../shared/utils/clone/cloneArray";
import { cloneCommonObject } from "../../shared/utils/clone/cloneCommonObject";
import { cloneDate } from "../../shared/utils/clone/cloneDate";
import { cloneMap } from "../../shared/utils/clone/cloneMap";
import { cloneSet } from "../../shared/utils/clone/cloneSet";
import { isPrototypeOfObject } from "../../shared/utils/isPrototypeOfObject";
import { isReactiveValue } from "@domain/typewards/isReactiveValue";

/**
 * Converts any proxy into a common value
 */
export function unproxify<T>(val: T): UnproxifyPort<T> {
  const item = isReactiveValue(val) ? val.$value : (val as T);
  if (item && typeof item === "object") {
    if (isPrototypeOfObject(item))
      return cloneCommonObject(item, unproxify) as UnproxifyPort<T>;
    if (Array.isArray(item))
      return cloneArray(item, unproxify) as UnproxifyPort<T>;
    if (item instanceof Date) return cloneDate(item) as UnproxifyPort<T>;
    if (item instanceof Map)
      return cloneMap(item, unproxify) as UnproxifyPort<T>;
    if (item instanceof Set)
      return cloneSet(item, unproxify) as UnproxifyPort<T>;
  }
  return item as UnproxifyPort<T>;
}
