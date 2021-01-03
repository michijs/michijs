import { LSCustomElement } from '../types';
import { setStandardAttribute } from '../utils/setStandardAttribute';

export function addReflectedAttributes(self: LSCustomElement) {
  self.lsStatic.reflectedAttributes.forEach(propertyKey => {
    setStandardAttribute(self, propertyKey, self[propertyKey]);
  });
}