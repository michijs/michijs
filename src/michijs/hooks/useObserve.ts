import { ObservableType, ObserverCallback } from "../types";
import { observeArray } from "./useObserve/observeArray";
import { observeCommonObject } from "./useObserve/observeCommonObject";
import { observeDate } from "./useObserve/observeDate";
import { observeMap } from "./useObserve/observeMap";
import { observeSet } from "./useObserve/observeSet";

export function useObserve<T>(
  item?: T,
  initialObservers?: ObserverCallback<T>[]
): ObservableType<T> {
  if (item && typeof item === "object") {
    if (Array.isArray(item))
      return observeArray(item, initialObservers) as ObservableType<T>;
    // Many built-in objects, for example Map, Set, Date, Promise and others make use of so-called internal slots.
    // These are like properties but reserved for internal, specification-only purposes.
    // For instance, Map stores items in the internal slot [[MapData]].
    // Built-in methods access them directly, not via [[Get]]/[[Set]] internal methods. So Proxy can’t intercept that.
    else if (item instanceof Date)
      return observeDate(item, initialObservers) as unknown as ObservableType<T>;
    else if (item instanceof Map)
      return observeMap(item, initialObservers) as unknown as ObservableType<T>;
    else if (item instanceof Set)
      return observeSet(item, initialObservers) as unknown as ObservableType<T>;
    // console.error(`The object with path "${props.propertyPath}" cannot be observed ${item}`)
  }
  return observeCommonObject(item, initialObservers) as unknown as ObservableType<T>;
}
