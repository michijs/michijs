import { LSCustomElement } from '../types';
import { setAttributeValue } from '../utils/setAttributeValue';
import { AllDomAttributes } from '../utils/whiteLists/AllDomAttributes';

export function setAttribute(element: LSCustomElement, name: string, value: any) {
  const blackList = element.lsStatic?.attributes || [];
  const reflectAttribute = AllDomAttributes.includes(name) && !blackList.includes(name);
  if (reflectAttribute) {
    try {
      element[name] = value;
    } catch (_) { }
    setAttributeValue(element, name, value);
  }
  else if (name === 'style') {
    element.removeAttribute('style');
    setStyle(element, value);
  } else {
    element[name] = value;
  }
}

function setStyle(element: LSCustomElement, value: any) {
  if (value) {
    Object.assign(element.style, value);
  } else {
    setAttributeValue(element, 'style', value);
  }
}