import type { LSCustomElement } from '../types';
import { getShadowRoot } from '../utils/getShadowRoot';

export function getRootNode(self: LSCustomElement | Document) {
  return getShadowRoot(self) ?? self.getRootNode() as Document | ShadowRoot;
}