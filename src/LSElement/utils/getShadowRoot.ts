import { LSCustomElement, StyleSheetContainer } from '../types';

export function getShadowRoot(self: LSCustomElement | Element |  Document): ShadowRoot & StyleSheetContainer {
  //@ts-ignore
  return self.shadowRoot ?? self.ls?.shadowRoot;
}