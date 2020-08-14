import { LSCustomElement } from '../types';
import { standardizePropertyName } from '../properties/standardizePropertyName';

export function setAttribute(self: LSCustomElement, newValue: any, key: string) {
  const formattedKey = standardizePropertyName(key);
  setAttributeValue(self, newValue, formattedKey);
}

export function setAttributeValue(self: LSCustomElement | Element, newValue: any, key: string) {
  switch (true) {
    case newValue === null:
    case newValue === undefined:
    case typeof newValue === 'boolean': {
      if (newValue) {
        self.setAttribute(key, '');
      } else {
        self.removeAttribute(key);
      }
      break;
    }
    case typeof newValue === 'object': {
      self.setAttribute(key, JSON.stringify(newValue));
      break;
    }
    default: {
      self.setAttribute(key, newValue);
    }
  }
}