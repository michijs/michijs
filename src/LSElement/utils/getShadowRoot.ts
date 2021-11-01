import { LSElement, StyleSheetContainer } from '../types';

export function getShadowRoot(self: LSElement | Document): ShadowRoot & StyleSheetContainer {
  //@ts-ignore
  return self.shadowRoot ?? self.ls?.shadowRoot;
}