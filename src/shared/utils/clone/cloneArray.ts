export const cloneArray = <I, T extends Array<I>, E = I>(
  array: T,
  transformItem: (item: I) => E,
): Array<E> =>
  array.map((x) => transformItem(x && typeof x === 'object' && '$value' in x ? x.$value as I : x));
