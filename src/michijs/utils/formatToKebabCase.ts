import { KebabCase } from "../types";

export function formatToKebabCase<T extends string>(variable: T): KebabCase<T> {
  return variable.replace(/[A-Z]/g, (m, index) =>
    index === 0 ? m.toLowerCase() : `-${m.toLowerCase()}`,
  ) as KebabCase<T>;
}
