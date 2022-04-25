import { LSCustomElement } from '../types';

export function getShadowRoot(self?: LSCustomElement | Element): ShadowRoot | null {
  return self ? self.shadowRoot ?? ('ls' in self ? self.ls?.shadowRoot: null): null;
}