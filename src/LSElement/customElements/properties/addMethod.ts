import { LSCustomElement } from '../../types';

function fn(self: LSCustomElement, callback: Function) {
  return (...args) => {
    return self.ls.store.actions.execute(() => {
      return callback.apply(self, args);
    });
  };
}

export function addMethod(self: LSCustomElement, propertyKey: string) {
  const method = fn(self, self[propertyKey]);
  delete self[propertyKey];
  self[propertyKey] = method;
}