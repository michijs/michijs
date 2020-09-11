import { LSCustomElement } from '../types';
import { setAttribute } from '../utils/setAttribute';

export function updateComputedReflectedAttributes(self: LSCustomElement) {
  if (self.computedReflectedAttributes) {
    const computedReflectedAttributes = self.computedReflectedAttributes();
    if (computedReflectedAttributes) {
      Object.keys(computedReflectedAttributes).forEach(attribute => {
        setAttribute(self, computedReflectedAttributes[attribute], attribute);
      });
    } else {
      console.error('Computed reflected attributes cannot be empty.');
    }
  }
}