import { LSCustomElement } from '../types';
import { AttributeManager } from '../classes/AttributeManager';

export function addReflectedAttributes(self: LSCustomElement) {
  self.lsStatic.reflectedAttributes.forEach(propertyKey => {
    AttributeManager.setStandardAttribute(self, propertyKey, self[propertyKey]);
  });
}