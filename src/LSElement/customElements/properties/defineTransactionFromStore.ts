import { LSCustomElement } from '../../types';

export function defineTransactionFromStore(self: LSCustomElement, propertyKey: string) {
  const transaction = self.ls.store.transactions[propertyKey];
  Object.defineProperty(self, propertyKey, {
    get() {
      return transaction;
    },
  });
}