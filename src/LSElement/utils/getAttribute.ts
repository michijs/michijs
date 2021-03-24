import { LSCustomElement } from "../types";

export function getAttribute(element: LSCustomElement, name: string) {
  if (name.startsWith('_')) {
    const key = name.substr(1);
    return element[key]
  } else {
    return getAttributeValue(element.getAttribute(name));
  }
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