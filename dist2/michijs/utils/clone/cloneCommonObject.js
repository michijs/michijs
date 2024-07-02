/**
 * @template {object} T
 * @param {T} item
 * @param {(item: unknown) => unknown} transformItem
 * @returns {T}
 */
export function cloneCommonObject(item, transformItem) {
  return Object.entries(item).reduce((previousValue, [key, value]) => {
    const observedItem = transformItem(value);
    previousValue[key] = observedItem;
    return previousValue;
  }, {});
}
