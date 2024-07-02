import { observeArray } from "./useObserve/observeArray";
import { observeCommonObject } from "./useObserve/observeCommonObject";
import { observeDate } from "./useObserve/observeDate";
import { observeMap } from "./useObserve/observeMap";
import { observeSet } from "./useObserve/observeSet";

/**
 * @typedef {import('../types').ObservableType} ObservableType
 * @typedef {import('../types').Subscription} Subscription
 */

/**
 * Responsible for observing changes on different types of values.
 * @template T
 * @param {T} [item] The value to be observed.
 * @param {Subscription<T>[]} [initialObservers] An array of initial observers of type Subscription<T>.
 * @returns {ObservableType<T>} A new observable
 */
export function useObserve(item, initialObservers) {
    if (item) {
        const typeofItem = typeof item;
        if (typeofItem === "object") {
            if (Array.isArray(item))
                return observeArray(item, initialObservers);
            // Many built-in objects, for example Map, Set, Date, Promise and others make use of so-called internal slots.
            // These are like properties but reserved for internal, specification-only purposes.
            // For instance, Map stores items in the internal slot [[MapData]].
            // Built-in methods access them directly, not via [[Get]]/[[Set]] internal methods. So Proxy can’t intercept that.
            if (item instanceof Date)
                return observeDate(item, initialObservers);
            if (item instanceof Map)
                return observeMap(item, initialObservers);
            if (item instanceof Set)
                return observeSet(item, initialObservers);
            // console.error(`The object with path "${props.propertyPath}" cannot be observed ${item}`)
        }
    }
    return observeCommonObject(item, initialObservers);
}
