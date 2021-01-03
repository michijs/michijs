import type { LSCustomElement } from '../types';
import { render } from './render';
import { getRootNode } from './getRootNode';
import { insertNewChildren } from './insertNewChildren';

export function executeFirstRender(self: LSCustomElement) {
  const renderResult = render(self);

  if (renderResult) {
    insertNewChildren(getRootNode(self), renderResult);
  }
}