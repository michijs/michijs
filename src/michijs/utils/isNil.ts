export const isNil = (x: unknown): x is undefined | null =>
  x === undefined || x === null;
