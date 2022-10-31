import { KebabCase } from '../types';

export function formatToKebabCase<T extends string>(variable: T): KebabCase<T> {
  let formattedVariable = variable.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);

  return formattedVariable as KebabCase<T>;
}