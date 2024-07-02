/**
 * @template T
 * @template {keyof T} K
 * @param {T} obj
 * @param {K[]} keys
 * @returns {Pick<T, K>}
 */
export function pick(obj, keys) {
  const newObj = {};
  keys.forEach((key) => {
    newObj[key] = obj[key];
  });

  return newObj;
}
