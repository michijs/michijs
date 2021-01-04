import type { LSCustomElement } from '../types';

export function getMountPoint(self: LSCustomElement) {
  return (self.shadowRoot ? self.shadowRoot : self) as ParentNode;
}