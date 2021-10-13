import { LSCustomElement } from '../../types';

export function defineTransactionFromStore(self: LSCustomElement, propertyKey: string) {
  Object.defineProperty(self, propertyKey, {
    get() {
      return self.ls.store.transactions[propertyKey];
    },
  });
}