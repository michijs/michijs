import type { LSCustomElement } from '../types';
import { getMountPoint } from './getMountPoint';
import { ElementUpdater } from '../classes/ElementUpdater';


export function rerender(self: LSCustomElement) {
  self.componentWillUpdate?.();
  const newChildren = self.render();
  new ElementUpdater(self, getMountPoint(self) as HTMLElement).updateElement([newChildren]);
  self.componentDidUpdate?.();
}
