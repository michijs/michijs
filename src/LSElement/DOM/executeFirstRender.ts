import type { LSCustomElement } from '../types';
import { insertNewChildren } from './insertNewChildren';
import { getMountPoint } from './getMountPoint';

export function executeFirstRender(self: LSCustomElement) {
  const renderResult = self.render?.();

  if (renderResult) {
    insertNewChildren(self as LSCustomElement, () => getMountPoint(self as LSCustomElement), Array.isArray(renderResult) ? renderResult : [renderResult]);
  }
}