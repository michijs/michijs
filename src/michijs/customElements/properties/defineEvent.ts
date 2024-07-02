import type { EventDispatcher } from "../../classes";
import type { MichiCustomElement } from "../../types";

export function defineEvent(
  self: MichiCustomElement,
  propertyKey: string,
  eventDispatcher: EventDispatcher<any>,
): void {
  Object.defineProperty(self, propertyKey, {
    get() {
      return (detail) => eventDispatcher.dispatch(self, detail);
    },
  });
}
