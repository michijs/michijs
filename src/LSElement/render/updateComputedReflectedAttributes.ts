import { LSCustomElement } from '../types';
import { setStandardAttribute } from '../utils/setStandardAttribute';

export function updateComputedReflectedAttributes(self: LSCustomElement) {
  const computedReflectedAttributes = self.computedReflectedAttributes?.();
  if (computedReflectedAttributes) {
    Object.keys(computedReflectedAttributes).forEach(attribute => {
      setStandardAttribute(self, attribute, computedReflectedAttributes[attribute]);
    });
  }
}