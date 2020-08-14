import { standardizePropertyName } from '../properties/standardizePropertyName';

export function getAttribute(self: Element, key: string) {
  const formattedKey = standardizePropertyName(key);
  const newValue = self.getAttribute(formattedKey);
  return getAttributeValue(newValue);
}

export function getAttributeValue(value) {
  switch (true) {
    case value === '' || value === 'true': {
      return true;
    }
    case value === null: {
      return false;
    }
    case !isNaN(Number(value)):
    case typeof value === 'object': {
      return JSON.parse(value);
    }
    default: {
      return value;
    }
  }
}