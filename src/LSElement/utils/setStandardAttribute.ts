import { LSCustomElement } from '../types';
import { setAttributeValue } from './setAttributeValue';
import { formatToKebabCase } from './formatToKebabCase';

export function setStandardAttribute(self: LSCustomElement, key: string, newValue: any) {
  const formattedKey = formatToKebabCase(key);
  setAttributeValue(self, formattedKey, newValue);
}