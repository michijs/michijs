import { removeStoredAttributes } from '../../properties/removeStoredAttributes';
import type { LSCustomElement } from '../../types';

export function disconnectedCallback(self: LSCustomElement) {
  if (self.parentNode === null) {//TODO: search a better way to validate if element does not exists anymore
    removeStoredAttributes(self);
    self.componentDidUnmount?.();
  }
}