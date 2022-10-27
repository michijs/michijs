import { MichiCustomElement } from '../../types';

export function defineTransactionFromStore(self: MichiCustomElement, propertyKey: string) {
  const transaction = self.$michi.store.transactions[propertyKey];
  Object.defineProperty(self, propertyKey, {
    get() {
      return transaction;
    },
  });
}