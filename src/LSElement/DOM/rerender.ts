import type { LSCustomElement } from '../types';
import { getMountPoint } from './getMountPoint';
import { ElementUpdater } from '../classes/ElementUpdater';


export function rerender(self: LSCustomElement) {
  self.willUpdate?.();
  const newChildren = self.render?.();
  new ElementUpdater(self, getMountPoint(self) as HTMLElement).updateElement(Array.isArray(newChildren) ? newChildren : [newChildren]);
  self.didUpdate?.();
}
