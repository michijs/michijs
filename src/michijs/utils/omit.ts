export function omit<T extends object, K extends string>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const newObj: Partial<T> = {};
  for (const key in obj)
    if (!keys.includes(key as unknown as K)) newObj[key] = obj[key];

  return newObj as Omit<T, K>;
}
