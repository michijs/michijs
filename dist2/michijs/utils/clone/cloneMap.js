/**
 * @template I
 * @template {Map<unknown, I> | Set<I>} T
 * @template E
 * @param {T} item
 * @param {(item: I) => E} transformItem
 * @returns {Map<?, E>}
 */
export function cloneMap(item, transformItem) {
  const newMap = new Map();
  item.forEach((value, key) => newMap.set(key ?? value, transformItem(value)));
  return newMap;
}
