import { MichiCustomElement, Store } from '../../types';

export function definePropertyFromStore(self: MichiCustomElement, propertyKey: string, store: Store, storeKey: string = propertyKey) {
  Object.defineProperty(self, propertyKey, {
    get() {
      return store.state[storeKey];
    },
    set(newValue) {
      store.state[storeKey] = newValue;
    }
  });
}
