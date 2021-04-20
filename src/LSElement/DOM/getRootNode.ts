import type { LSCustomElement } from '../types';
import { getShadowRoot } from '../utils/getShadowRoot';

export function getRootNode(self: LSCustomElement) {
  return getShadowRoot(self) || self.getRootNode() as DocumentFragment;
}