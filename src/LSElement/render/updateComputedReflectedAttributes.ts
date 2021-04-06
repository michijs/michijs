import { LSCustomElement } from '../types';
import { setStandardAttribute } from '../utils/setStandardAttribute';

export function updateComputedReflectedAttributes(self: LSCustomElement) {
  const computedReflectedAttributes = self.computedReflectedAttributes?.();
  if (computedReflectedAttributes) {
    Object.entries(computedReflectedAttributes).forEach(([key, value]) => {
      setStandardAttribute(self, key, value);
    });
  }
}