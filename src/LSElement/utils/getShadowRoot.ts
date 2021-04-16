import { LSCustomElement } from 'src';
import { StyleSheetContainer } from '../types';

export function getShadowRoot(self: LSCustomElement | DocumentFragment): ShadowRoot & StyleSheetContainer {
  //@ts-ignore
  return self.shadowRoot || self._shadowRoot;
}