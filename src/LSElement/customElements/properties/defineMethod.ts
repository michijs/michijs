import { LSCustomElement } from '../../types';

export function defineMethod(self: LSCustomElement, propertyKey: string, method: Function) {
  const bindedFunction = method.bind(self);
  Object.defineProperty(self, propertyKey, {
    get() {
      return bindedFunction;
    },
  });
}