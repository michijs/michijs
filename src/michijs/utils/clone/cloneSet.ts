export function cloneSet<I, T extends Set<I>, E>(item: T, transformItem: (item: I) => E): Set<E> {
  const newSet = new Set<E>();
  item.forEach((value) => newSet.add(transformItem(value)));
  return newSet;
}