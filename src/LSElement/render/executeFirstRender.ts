import type { LSCustomElement } from '../types';
import { render } from './render';
import { getRootNode } from './gerRootNode';
import { updateLsSlots } from './updateLsSlots';
import { updateComputedReflectedAttributes } from './updateComputedReflectedAttributes';

export function executeFirstRender(self: LSCustomElement) {
  updateLsSlots(self);
  updateComputedReflectedAttributes(self);

  const renderResult = render(self);
  if (renderResult) {
    renderResult.forEach(element => {
      getRootNode(self).appendChild(element);
    });
  }
}