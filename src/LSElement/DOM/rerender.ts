import type { LSCustomElement } from '../types';

export function rerender(self: LSCustomElement) {
  self.willUpdate?.();
  const newChildren = self.render?.();
  self.ls.node = self.ls.node.updateElement(newChildren);

  // new ElementUpdater(self, getMountPoint(self) as HTMLElement).updateElement(Array.isArray(newChildren) ? newChildren : [newChildren]);
  self.didUpdate?.();
}
