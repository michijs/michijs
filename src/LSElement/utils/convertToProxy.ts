import { CallbackType, LSCustomElement } from '../types';

export function convertToProxy(initialValue, callback: CallbackType, self: LSCustomElement, propertyName?: string) {
  const proxyInitialValue = {};
  Object.keys(initialValue).forEach(key => {
    proxyInitialValue[key] = convertSingleValueToProxy(initialValue[key], callback, self, propertyName || key);
  });
  return createProxy(proxyInitialValue, callback, self, propertyName);
}

function convertSingleValueToProxy(initialValue, callback: CallbackType, self: LSCustomElement, propertyName?: string){
  if (Array.isArray(initialValue)) {
    return createProxy(initialValue, callback, self, propertyName);
  } else if (typeof initialValue === 'object') {
    return convertToProxy(initialValue, callback, self, propertyName);
  } else {
    return initialValue;
  }
}

function createProxy(initialValue, callback: CallbackType, self: LSCustomElement, propertyName?: string) {
  return new Proxy(initialValue, {
    deleteProperty: function (_target, property: string) {
      callback(propertyName || property, undefined, undefined);
      return true;
    },
    get: function (target, property: string) {
      if (typeof target[property] === 'function') {
        return function (...args) {
          const callBackPropertyName = propertyName;
          const callBackOldValue = self[callBackPropertyName];
          const oldValue = Object.values(target);
          const result = Array.prototype[property].apply(target, args);
          const newValue = target;
          if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
            const callBackNewValue = self[callBackPropertyName];
            callback(callBackPropertyName, callBackNewValue, callBackOldValue);
          }
          return result;
        };
      }
      return target[property];
    },
    set: function (target, property: string, newValue, _receiver) {
      const callBackPropertyName = propertyName || property;
      const callBackOldValue = self[callBackPropertyName];
      target[property] = convertSingleValueToProxy(newValue, () => callback(callBackPropertyName, callBackNewValue, callBackOldValue), self, propertyName);
      const callBackNewValue = self[callBackPropertyName];
      callback(callBackPropertyName, callBackNewValue, callBackOldValue);
      return true;
    }
  });
}