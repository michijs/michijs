import { LSCustomElement } from '../../types';
import { AttributeManager } from '../../classes/AttributeManager';

export function setReflectedAttributes(self: LSCustomElement, observedAttributes: string[]) {
  observedAttributes.forEach(formattedPropertyKey => {
    AttributeManager.setAttributeValue(self, formattedPropertyKey, self[formattedPropertyKey]);
  });
}