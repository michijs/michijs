import { ProxiedValue } from "../../classes/ProxiedValue";

export const cloneArray = <I, T extends Array<I>, E = I>(
  array: T,
  transformItem: (item: I) => E,
): Array<E> => array.map((x) =>
  transformItem(x instanceof ProxiedValue ? x.$value : x),
);
