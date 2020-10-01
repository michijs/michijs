import { LSCustomElement } from '../types';
import { executeFirstRender } from '../render/executeFirstRender';
import { addAttributes } from '../properties/addAttributes';

export function connectedCallback(self: LSCustomElement) {
  if (!self.ls?.alreadyRendered) {
    if (self.componentWillMount) {
      self.componentWillMount();
    }
    addAttributes(self);
    executeFirstRender(self);
    self.ls.alreadyRendered = true;
    if (self.componentDidMount) {
      self.componentDidMount();
    }
  }
}