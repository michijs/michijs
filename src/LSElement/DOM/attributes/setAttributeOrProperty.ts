import { setAttribute } from './setAttribute';

export function setAttributeOrProperty(element: Element | HTMLElement, name: string, newValue: any) {
  if (name.startsWith('_')) {
    const propertyName = name.substring(1);
    element[propertyName] = newValue;
  } else {
    setAttribute(element, name, newValue);
  }
}