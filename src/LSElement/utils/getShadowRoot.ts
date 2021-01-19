import { LSCustomElement } from 'src';

export function getShadowRoot(self: LSCustomElement): ShadowRoot & { adoptedStyleSheets: CSSStyleSheet[] } {
  //@ts-ignore
  return self.shadowRoot || self._shadowRoot;
}