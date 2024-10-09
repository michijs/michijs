import type { MichiCustomElement, ObservableType } from "../../types";

export function definePropertyFromObservable(
  self: MichiCustomElement,
  propertyKey: string,
  observable: ObservableType<any>,
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
