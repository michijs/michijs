import { KebabCase } from '../types';

export function formatToKebabCase<T extends string>(variable: T): KebabCase<T> {
  let formattedVariable = variable.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
  if (formattedVariable.startsWith('-')) {
    formattedVariable = formattedVariable.substring(1, formattedVariable.length);
  }
  return formattedVariable as KebabCase<T>;
}