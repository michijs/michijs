import { EventDispatcher } from '../../classes';
import { LSCustomElement } from '../../types';

export function defineEvent(self: LSCustomElement, propertyKey: string, eventDispatcher: EventDispatcher<any>) {
  Object.defineProperty(self, propertyKey, {
    get() {
      return (detail) => eventDispatcher.dispatch(self, detail);
    },
  });
}