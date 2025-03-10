export const isPrototypeOfObject = (obj: unknown): boolean =>
  Object.getPrototypeOf(obj) === Object.prototype;
