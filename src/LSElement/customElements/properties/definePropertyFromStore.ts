import { lsStore } from '../../hooks';
import { LSCustomElement } from '../../types';

export function definePropertyFromStore(self: LSCustomElement, propertyKey: string, store: ReturnType<typeof lsStore>, storeKey: string = propertyKey) {
  Object.defineProperty(self, propertyKey, {
    get() {
      return store.state[storeKey];
    },
    set(newValue) {
      store.state[storeKey] = newValue;
    }
  });
}
