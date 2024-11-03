export function omit<T extends object, K extends string>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const newObj: Partial<T> = {};
  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key as K)) newObj[key] = obj[key];
  });

  return newObj as Omit<T, K>;
}
