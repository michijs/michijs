/**
 * @template I
 * @template {Array<I>} T
 * @template [E = I]
 * @param {T} array
 * @param {(item: I) => E} transformItem
 * @returns {E[]}
 */
export function cloneArray(array, transformItem) {
  return array.map(transformItem);
}
