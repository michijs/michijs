import { isObservableType } from "../typeWards/isObservableType";

/**
 * @typedef {import('../types').ObservableType} ObservableType
 */

/**
 * @template T
 * @param {T} obj
 * @returns {ObservableType<T>[]}
 */
export function getObservables(obj) {
    if (obj)
        if (isObservableType(obj)) {
            return [obj];
        }
        else if (typeof obj === "object") {
            const observables = new Array();
            Object.values(obj).forEach((x) => {
                observables.push(...getObservables(x));
            });
            return observables;
        }
    return [];
}
