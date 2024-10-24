export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const newObj: Partial<T> = {};
  keys.forEach((key) => {
    newObj[key] = obj[key];
  });

  return newObj as Pick<T, K>;
}
