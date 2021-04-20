import type { LSCustomElement } from '../types';
import { insertNewChildren } from './insertNewChildren';
import { getMountPoint } from './getMountPoint';

export function executeFirstRender(self: LSCustomElement) {
  const renderResult = self.render();

  if (renderResult) {
    insertNewChildren(self, getMountPoint(self), [renderResult]);
  }
}