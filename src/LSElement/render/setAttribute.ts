import { LSCustomElement } from '../types';
import { isCustomElement } from '../utils/isCustomElement';
import { setAttributeValue } from '../utils/setAttributeValue';

export function setAttribute(element: LSCustomElement, name: string, value: any) {
  if (name === 'style') {
    element.removeAttribute('style');
    setStyle(element, value);
  } else {
    if (isCustomElement(element)) {
      const blackList = element.lsStatic?.attributes || [];
      if (!(name in element) && !blackList.includes(name)) {
        setAttributeValue(element, name, value);
      } else {
        try {
          element[name] = value;
        } catch (_) {
        }
      }
    } else {
      setAttributeValue(element, name, value);
    }
  }
}

function setStyle(element: LSCustomElement, value: any) {
  if (value) {
    Object.assign(element.style, value);
  } else {
    setAttributeValue(element, 'style', value);
  }
}