import { LSCustomElement } from '../types';

export function setAttributeValue(self: LSCustomElement | Element, key: string, newValue: any) {
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