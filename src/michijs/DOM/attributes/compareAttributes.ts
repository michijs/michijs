import { deepEqual } from '../../utils/deepEqual';
import { getAttributeValue } from './getAttributeValue';

export function compareAttributes(el: Element, name: string, value: unknown) {
  if (value === null || value === undefined || value === false) {
    return !el.hasAttribute(name);
  } else if (value === true) {
    return el.hasAttribute(name);
  } else if (value === 'true' || value === 'false') {
    return el.getAttribute(name) === value;
  } 
  return deepEqual(getAttributeValue(el.getAttribute(name)), value);
  
}
