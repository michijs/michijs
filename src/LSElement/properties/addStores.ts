import type { LSCustomElement } from '../types';
import { definePropertyFromStore } from './definePropertyFromStore';

export function addStores(self: LSCustomElement) {
  self.lsStatic.stores.forEach(storeProperty => {
    definePropertyFromStore(self, storeProperty.propertyKey);
    self[storeProperty.propertyKey] = storeProperty.store.getState();
    storeProperty.store.subscribe(() => {
      self[storeProperty.propertyKey] = storeProperty.store.getState();
    });
  });
}