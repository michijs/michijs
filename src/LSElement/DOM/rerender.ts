import type { LSCustomElement } from '../types';

function rerenderFn(self: LSCustomElement) {
  self.willUpdate?.();
  const newChildren = self.render?.();
  self.ls.node = self.ls.node.updateElement(newChildren);
  self.didUpdate?.();
}

export function rerender(self: LSCustomElement) {
  self.ls.renderInProgress.push(() => {
    rerenderFn(self);
    self.ls.renderInProgress.splice(0,1);
    self.ls.renderInProgress[0]?.();
  });
  if (self.ls.renderInProgress.length === 1)
    self.ls.renderInProgress[0]();
}
