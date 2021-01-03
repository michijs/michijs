import { LSCustomElement } from '../types';

export function definePropertyFromStore(self: LSCustomElement, propertyKey: string, storeKey: string = propertyKey) {
  delete self[propertyKey];
  Object.defineProperty(self, propertyKey, {
    get() {
      return self.ls.stateStore.getState()[storeKey];
    },
    set(newValue) {
      self.ls.stateStore.setState({[storeKey]: newValue});
    }
  });
}
