export function cloneCommonObject<T extends object>(
  item: T,
  transformItem: (item: unknown) => unknown,
): T {
  return Object.entries(item).reduce((previousValue, [key, value]) => {
    const observedItem = transformItem(value);
    previousValue[key] = observedItem;
    return previousValue;
  }, {}) as T;
}