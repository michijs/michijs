import { LSCustomElement } from '../../types';

export function definePropertyFromStore(self: LSCustomElement, propertyKey: string, storeKey: string = propertyKey) {
  Object.defineProperty(self, propertyKey, {
    get() {
      return self.ls.store.state[storeKey];
    },
    set(newValue) {
      self.ls.store.state[storeKey] = newValue;
    }
  });
}
