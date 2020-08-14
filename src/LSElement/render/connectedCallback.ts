import { LSCustomElement } from '../types';
import { executeFirstRender } from './executeFirstRender';
import { addAttributes } from '../properties/addAttributes';

export function connectedCallback(self: LSCustomElement) {
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