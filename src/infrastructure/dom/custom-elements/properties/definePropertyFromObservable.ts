import type { MichiCustomElement } from "../types";
import type { ObservableProxyPort } from "@ports";

export function definePropertyFromObservable(
  self: MichiCustomElement,
  propertyKey: string,
  observable: ObservableProxyPort<any>,
  observableKey: string = propertyKey,
): void {
  Object.defineProperty(self, propertyKey, {
    get() {
      return observable[observableKey];
    },
    set(newValue) {
      observable[observableKey] = newValue;
    },
  });
}
