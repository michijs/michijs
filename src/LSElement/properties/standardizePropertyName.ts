import { formatToKebabCase } from '../utils/formatToKebabCase';

export function standardizePropertyName(propertyName: string) {
  return formatToKebabCase(propertyName);
}