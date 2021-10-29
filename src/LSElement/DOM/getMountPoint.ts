import type { LSCustomElement } from '../types';
import { getShadowRoot } from '../utils/getShadowRoot';

export function getMountPoint(self: LSCustomElement) {
  return getShadowRoot(self) ?? self as ParentNode;
}