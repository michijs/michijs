import { LSCustomElement } from '../types';

export function addObservers(self: LSCustomElement) {
  if (self.lsStatic.observers.length > 0) {
    self.ls.stateStore.subscribe((propertyKey, newValue, oldValue) => {
      if (self.ls.alreadyRendered) {
        self.lsStatic.observers.forEach(observer => {
          if (observer.observedProperty === propertyKey) {
            self[observer.observerName](newValue, oldValue);
          }
        });
      }
    });
  }
}