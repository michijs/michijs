import { LSCustomElement } from '../types';
import { standardizePropertyName } from '../properties/standardizePropertyName';
import { setAttributeValue } from './setAttributeValue';

export function setStandardAttribute(self: LSCustomElement, key: string, newValue: any) {
  const formattedKey = standardizePropertyName(key);
  setAttributeValue(self, formattedKey, newValue);
}