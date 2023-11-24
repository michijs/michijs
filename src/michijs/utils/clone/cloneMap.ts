export function cloneMap<I, T extends Map<unknown, I> | Set<I>, E>(item: T, transformItem: (item: I) => E): Map<unknown, E> {
  const newMap = new Map<unknown, E>();
  item.forEach((value, key) => newMap.set(key ?? value, transformItem(value)));
  return newMap;
}