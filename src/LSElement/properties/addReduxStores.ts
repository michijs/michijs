import type { LSCustomElement } from '../types';
import { rerender } from '../render/rerender';

export function addReduxStores(self: LSCustomElement) {
  self.lsStatic.stores.forEach(storeProperty => {
    self[storeProperty.propertyName] = storeProperty.store.getState();
    storeProperty.store.subscribe(() => {
      self[storeProperty.propertyName] = storeProperty.store.getState();
      rerender(self);
    });
  });
}