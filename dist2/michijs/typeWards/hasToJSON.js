/**
 * @template {{}} T
 * @param {T} el
 * @returns {el is T & { toJSON(): any }}
 */
export function hasToJSON(el) {
    return el.toJSON;
}
