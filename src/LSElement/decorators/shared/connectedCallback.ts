import type { LSCustomElement } from '../../types';
import { addReflectedAttributes } from '../../properties/addReflectedAttributes';
import { executeFirstRender } from '../../DOM/executeFirstRender';

export function connectedCallback(self: LSCustomElement) {//Children and attributes should be managed after constructor
  addReflectedAttributes(self);
  if (!self.ls.alreadyRendered) {
    self.componentWillMount?.();
    executeFirstRender(self);
    self.ls.alreadyRendered = true;
    self.componentDidMount?.();
  }
}