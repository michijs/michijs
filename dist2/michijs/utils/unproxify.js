import { ProxiedValue } from "../..";
import { cloneArray, cloneCommonObject, cloneDate, cloneMap, cloneSet, } from "./clone";

/**
 * Converts any proxy into a common value
 * @template T
 * @param {T} val
 * @returns {import("../types").Unproxify<T>}
 */
export function unproxify(val) {
    const item = val instanceof ProxiedValue ? val.$value : val;
    if (item && typeof item === "object") {
        if (Array.isArray(item))
            return cloneArray(item, unproxify);
        if (item instanceof Date)
            return cloneDate(item);
        if (item instanceof Map)
            return cloneMap(item, unproxify);
        if (item instanceof Set)
            return cloneSet(item, unproxify);
        if (Object.getPrototypeOf(item) === Object.prototype)
            return cloneCommonObject(item, unproxify);
        return item;
    }
    return item;
}
