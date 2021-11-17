import type { LSCustomElement } from '../types';
import { LSNode } from '../LSNode/LSNode';
import { getMountPoint } from './getMountPoint';

export function executeFirstRender(self: LSCustomElement) {
  const renderResult = self.render?.();

  self.ls.node = LSNode(renderResult as JSX.Element, false, self);
  getMountPoint(self).append(self.ls.node.valueOf());
}