import type { LSCustomElement } from '../types';
import { render } from './render';
import { getRootNode } from './getRootNode';
import { updateComputedReflectedAttributes } from './updateComputedReflectedAttributes';
import { createElement } from './createElement';

export function executeFirstRender(self: LSCustomElement) {
  updateComputedReflectedAttributes(self);
  const renderResult = render(self);

  if (renderResult) {
    const createdElements = renderResult.map(element => createElement(element));
    getRootNode(self).append(...createdElements);
  }
}