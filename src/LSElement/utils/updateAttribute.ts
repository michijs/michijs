import { setAttributeValue } from './setAttribute';
import { AllDomAttributes } from '../classes/AllDomAttributes';
import { getAttribute } from './getAttribute';

export function updateAttribute(elem: Element, attr: string, value: any) {
  try {
    if (elem[attr] !== value) {
      elem[attr] = value;
    }
  } catch (_) {//For readonly values only set attribute
  }

  const reflectAttribute = AllDomAttributes.includes(attr);
  if (reflectAttribute && getAttribute(elem, attr) !== value) {
      setAttributeValue(elem, value, attr);
  }
}