import { getAttributeValue } from './getAttributeValue';

export function getAttributeOrProperty(element: Element | HTMLElement, name: string) {
  if (name.startsWith('_')) {
    const propertyName = name.substring(1);
    return element[propertyName];
  } 
  return getAttributeValue(element.getAttribute(name));
  
}