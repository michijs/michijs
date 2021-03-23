import { LSCustomElement } from '../types';
import { setAttributeValue } from '../utils/setAttributeValue';

export function setAttribute(element: LSCustomElement, name: string, value: any) {
  if (name === 'style') {
    element.removeAttribute('style');
    setStyle(element, value);
  } else {
    setAttributeValue(element, name, value);
  }
}

function setStyle(element: LSCustomElement, value: any) {
  if (value) {
    Object.assign(element.style, value);
  } else {
    setAttributeValue(element, 'style', value);
  }
}