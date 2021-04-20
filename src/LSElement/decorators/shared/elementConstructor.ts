import type { LSCustomElement, ShadowOption, OtherShadowOptions } from '../../types';
import { addStores } from '../../properties/addStores';
import { initStore } from '../../properties/initStore';
import { addAttributes } from '../../properties/addAttributes';
import { addStoredAttributes } from '../../properties/addStoredAttributes';
import { addObservers } from '../../properties/addObservers';

export function elementConstructor(self: LSCustomElement, shadow: ShadowOption, otherShadowOptions: OtherShadowOptions) {
  if (shadow) {
    const shadowMode = shadow;
    const attachedShadow = self.attachShadow({ mode: shadowMode, ...otherShadowOptions });
    if (shadowMode === 'closed') {
      self._shadowRoot = attachedShadow;
    }
  }
  self.ls = self.ls || {};
  initStore(self);
  addStores(self);
  addAttributes(self);
  addStoredAttributes(self);
  addObservers(self);
}