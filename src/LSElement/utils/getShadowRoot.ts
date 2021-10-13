import { LSElement, StyleSheetContainer } from '../types';

export function getShadowRoot(self: LSElement): ShadowRoot & StyleSheetContainer {
  //@ts-ignore
  return self.shadowRoot || self.ls.shadowRoot;
}