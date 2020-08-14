import type { LSCustomElement } from '../types';

export function getRootNode(self: LSCustomElement) {
  return (self.shadowRoot ? self.shadowRoot : self) as DocumentFragment;
}