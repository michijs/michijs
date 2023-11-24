export function cloneArray<I, T extends Array<I>, E = I>(
  array: T,
  transformItem: (item: I) => E,
): Array<E> {
  return array.map(transformItem);
}
