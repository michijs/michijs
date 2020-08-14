import { setAttributeValue } from './setAttribute';
import { AllDomAttributes } from '../classes/AllDomAttributes';

export function updateAttribute(elem: Element, attr: string, value: any) {
  try {
    elem[attr] = value;
  } catch (_) {//For readonly values only set attribute
  }

  const reflectAttribute = AllDomAttributes.includes(attr);
  if (reflectAttribute) {
    setAttributeValue(elem, value, attr);
  }
}