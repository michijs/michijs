import { formatToKebabCase } from './formatToKebabCase';

export function getAttribute(self: Element, key: string) {
  const formattedKey = formatToKebabCase(key);
  const newValue = self.getAttribute(formattedKey);
  return getAttributeValue(newValue);
}

export function getAttributeValue(value) {
  try {
    return JSON.parse(value);
  } catch {
    switch (true) {
      case value === '' || value === 'true': {
        return true;
      }
      case value === null: {
        return false;
      }
      default: {
        return value;
      }
    }
  }
}