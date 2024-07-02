/**
 * @typedef {import('../types').ObservableLike} ObservableLike
 */

/**
 * @template T
 * @param {T} jsx
 * @returns {jsx is ObservableLike<unknown>}
 */
export function isObservableType(jsx) {
    // "in" does not work with primitive types
    return !!jsx?.subscribe;
}
