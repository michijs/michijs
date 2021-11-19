import { LSCustomElement } from '../../types';
import { setAttribute } from '../../DOM/attributes/setAttribute';

export function setReflectedAttributes(self: LSCustomElement, observedAttributes: string[]) {
  observedAttributes.forEach(formattedPropertyKey => {
    setAttribute(self, formattedPropertyKey, self[formattedPropertyKey]);
  });
}