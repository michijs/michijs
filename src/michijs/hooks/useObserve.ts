import { ProxiedValue } from "../classes/ProxiedValue";
import type { ObservableType, Subscription } from "../types";
import { observeArray } from "./useObserve/observeArray";
import { observeCommonObject } from "./useObserve/observeCommonObject";
import { observeDate } from "./useObserve/observeDate";
import { observeMap } from "./useObserve/observeMap";
import { observeSet } from "./useObserve/observeSet";

/**
 * Responsible for observing changes on different types of values.
 * @param item The value to be observed.
 * @param initialObservers An array of initial observers of type Subscription<T>.
 * @returns A new observable
 */
export function useObserve<T>(
  item?: T,
  initialObservers?: Subscription<T>[],
): ObservableType<T> {
  const itemValue = item instanceof ProxiedValue ? item?.valueOf() as T: item;
  if (itemValue) {
    const typeofItem = typeof itemValue;
    if (typeofItem === "object") {
      if (Array.isArray(itemValue))
        return observeArray(itemValue, initialObservers) as ObservableType<T>;
      // Many built-in objects, for example Map, Set, Date, Promise and others make use of so-called internal slots.
      // These are like properties but reserved for internal, specification-only purposes.
      // For instance, Map stores items in the internal slot [[MapData]].
      // Built-in methods access them directly, not via [[Get]]/[[Set]] internal methods. So Proxy can’t intercept that.
      if (itemValue instanceof Date)
        return observeDate(
          itemValue,
          initialObservers,
        ) as unknown as ObservableType<T>;
      if (itemValue instanceof Map)
        return observeMap(
          itemValue,
          initialObservers,
        ) as unknown as ObservableType<T>;
      if (itemValue instanceof Set)
        return observeSet(
          itemValue,
          initialObservers,
        ) as unknown as ObservableType<T>;
      // console.error(`The object with path "${props.propertyPath}" cannot be observed ${item}`)
    }
  }
  return observeCommonObject<T>(
    itemValue as T,
    initialObservers,
  ) as unknown as ObservableType<T>;
}
