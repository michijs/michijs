import type { LSCustomElement } from '../types';
import { getMountPoint } from './getMountPoint';
import { ObjectFactory } from '../DOMDiff/ObjectFactory';

export function executeFirstRender(self: LSCustomElement) {
  const newChildren = self.render?.();
  ObjectFactory.updateChildren(getMountPoint(self), Array.isArray(newChildren) ? newChildren: [newChildren], false, self);
}