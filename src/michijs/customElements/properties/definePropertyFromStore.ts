import type { AnyObject, MichiCustomElement, Store } from "../../types";

export function definePropertyFromStore(
  self: MichiCustomElement,
  propertyKey: string,
  store: Store<AnyObject, AnyObject>,
  storeKey: string = propertyKey,
) {
  Object.defineProperty(self, propertyKey, {
    get() {
      return store.state[storeKey];
    },
    set(newValue) {
      store.state[storeKey] = newValue;
    },
  });
}
