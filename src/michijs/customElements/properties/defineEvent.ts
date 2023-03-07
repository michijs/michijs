import { EventDispatcher } from '../../classes';
import { MichiCustomElement } from '../../types';

export function defineEvent(
  self: MichiCustomElement,
  propertyKey: string,
  eventDispatcher: EventDispatcher<any>,
) {
  Object.defineProperty(self, propertyKey, {
    get() {
      return (detail) => eventDispatcher.dispatch(self, detail);
    },
  });
}
