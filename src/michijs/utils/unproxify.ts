import { ObservableValue, ProxiedValueInterface } from "../types";

/**
 * Converts any proxy into a common value
 */
export function unproxify<
  T,
  Y = T extends ObservableValue<infer Z, unknown> ? Z : T,
>(val: T): Y {
  const item =
    (val as ProxiedValueInterface<T, T> | undefined)?.$value ?? (val as T);
  if (item && typeof item === "object") {
    if (item instanceof Array) return item.map(unproxify) as Y;
    if (item instanceof Date) {
      try {
        return structuredClone(item) as Y;
      } catch {
        return new Date(item) as Y;
      }
    }
    if (item instanceof Map) {
      const newMap = new Map<unknown, unknown>();
      item.forEach((value, key) => newMap.set(key, unproxify(value)));
      return newMap as Y;
    }
    if (item instanceof Set) {
      const newSet = new Set<unknown>();
      item.forEach((value) => newSet.add(unproxify(value)));
      return newSet as Y;
    }
    if (Object.getPrototypeOf(item) === Object.prototype)
      return Object.entries(item).reduce((previousValue, [key, value]) => {
        const observedItem = unproxify(value);
        previousValue[key] = observedItem;
        return previousValue;
      }, {}) as Y;
  }
  return item as unknown as Y;
}
