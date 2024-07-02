/**
 * @template I
 * @template {Set<I>} T
 * @template E
 * @param {T} item
 * @param {(item: I) => E} transformItem
 * @returns {Set<E>}
 */
export function cloneSet(item, transformItem) {
    const newSet = new Set();
    item.forEach((value) => newSet.add(transformItem(value)));
    return newSet;
}
