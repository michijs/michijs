import type { MichiCustomElement } from '../types';
import { getShadowRoot } from '../utils/getShadowRoot';

export function getRootNode(self: MichiCustomElement) {
  return getShadowRoot(self) ?? self.getRootNode() as Document | ShadowRoot;
}