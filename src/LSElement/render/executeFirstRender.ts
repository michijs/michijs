import type { LSCustomElement } from '../types';
import { render } from './render';
import { insertNewChildren } from './insertNewChildren';
import { getMountPoint } from './getMountPoint';

export function executeFirstRender(self: LSCustomElement) {
  const renderResult = render(self);

  if (renderResult) {
    insertNewChildren(self, getMountPoint(self), renderResult);
  }
}