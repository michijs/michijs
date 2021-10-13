import { ChangeFunction } from '../types';
import { deepEqual } from '../utils/deepEqual';


type customHandler<O extends object, T extends keyof ProxyHandler<O>> = (onChange: ChangeFunction, rootPropertyName: string | symbol) => ProxyHandler<O>[T]

type customObjectSetType = customHandler<object, 'set'>

const customObjectSet = (onChange: Parameters<customObjectSetType>[0], rootPropertyName: Parameters<customObjectSetType>[1], customValidation = true): ReturnType<customObjectSetType> => {
  return (target, property, newValue, receiver) => {
    const oldValue = target[property];
    const notifyChange = customValidation && !deepEqual(newValue, oldValue);
    const proxyValue = observe(newValue, onChange, rootPropertyName || property);
    const result = Reflect.set(target, property, proxyValue, receiver);
    if (notifyChange)
      onChange(rootPropertyName || property);
    return result;
  };
};

const customObjectDelete: customHandler<object, 'deleteProperty'> = (onChange, rootPropertyName) => {
  return (target, property) => {
    const hasAnOldValue = target[property] !== undefined;
    const result = Reflect.deleteProperty(target, property);
    if (hasAnOldValue)
      onChange(rootPropertyName || property);
    return result;
  };
};

const customMapAndSetClear = (onChange: ChangeFunction, rootPropertyName: string | symbol, target: Map<any, any> | Set<any>, clearFn: Map<any, any>['clear'] | Set<any>['clear']): Map<any, any>['clear'] | Set<any>['clear'] => {
  return function () {
    const notifyChange = target.size !== 0;
    const result = clearFn();
    if (notifyChange)
      onChange(rootPropertyName);//TODO: Should send each index?
    return result;
  };
};

const customMapAndSetDelete = (onChange: ChangeFunction, rootPropertyName: string | symbol, target: Map<any, any> | Set<any>, deleteFn: Map<any, any>['delete'] | Set<any>['delete']): Map<any, any>['delete'] | Set<any>['delete'] => {
  //In Map is key, in Set is value
  return function (key) {
    const notifyChange = target.has(key);
    const result = deleteFn(key);
    if (notifyChange)
      onChange(rootPropertyName || key);
    return result;
  };
};

const customSetGet: customHandler<Set<any>, 'get'> = (onChange: ChangeFunction, rootPropertyName: string | symbol) => {
  return (target, property: keyof Set<any>) => {
    const targetProperty = Reflect.get(target, property);
    const bindedTargetProperty = typeof targetProperty === 'function' ? targetProperty.bind(target) : targetProperty;
    switch (property) {
      case 'clear': {
        return customMapAndSetClear(onChange, rootPropertyName, target, bindedTargetProperty);
      }
      case 'add': {
        return function (newValue) {
          const notifyChange = !target.has(newValue);
          const result = bindedTargetProperty(observe(newValue, onChange, rootPropertyName || newValue));
          if (notifyChange)
            onChange(rootPropertyName || newValue);
          return result;
        };
      }
      case 'delete': {
        return customMapAndSetDelete(onChange, rootPropertyName, target, bindedTargetProperty);
      }
      default: {
        return bindedTargetProperty;
      }
    }
  };
};
const customMapGet: customHandler<Map<any, any>, 'get'> = (onChange: ChangeFunction, rootPropertyName: string | symbol) => {
  return (target, property: keyof Map<any, any>) => {
    const targetProperty = Reflect.get(target, property);
    const bindedTargetProperty = typeof targetProperty === 'function' ? targetProperty.bind(target) : targetProperty;
    switch (property) {
      case 'clear': {
        return customMapAndSetClear(onChange, rootPropertyName, target, bindedTargetProperty);
      }
      case 'set': {
        return function (key, newValue) {
          const notifyChange = !deepEqual(newValue, (target as Map<any, any>).get(key));
          const result = bindedTargetProperty(key, observe(newValue, onChange, rootPropertyName || key));
          if (notifyChange)
            onChange(rootPropertyName || key);
          return result;
        };
      }
      case 'delete': {
        return customMapAndSetDelete(onChange, rootPropertyName, target, bindedTargetProperty);
      }
      default: {
        return bindedTargetProperty;
      }
    }
  };
};

const mutableArrayFunctions: Array<keyof []> = ['fill', 'push', 'pop', 'reverse', 'sort', 'shift', 'unshift', 'splice'];

export function observe<T extends object>(item: T, onChange: ChangeFunction, rootPropertyName: string | symbol = null): T {
  if (item && typeof item === 'object') {
    if (Array.isArray(item)) {
      const proxiedArray = item.map(value => observe(value, onChange, rootPropertyName)) as T;

      return new Proxy(proxiedArray, {
        set: (target, property, newValue, receiver) => customObjectSet(onChange, rootPropertyName, property !== 'length')(target, property, newValue, receiver),
        get(target, property, receiver) {
          // TODO: refactor
          if ((mutableArrayFunctions as (symbol | string)[]).includes(property)) {
            const origMethod = target[property];

            return function (...args) {
              origMethod.apply(target, args);
              onChange(rootPropertyName || property);
            };
          }
          return Reflect.get(target, property, receiver);
        },
        deleteProperty: customObjectDelete(onChange, rootPropertyName)
      }) as T;
      // item instanceof Blob || Symbol Promise RegExp Set
    } else if (item instanceof Error || item instanceof WeakMap || item instanceof WeakSet || ArrayBuffer.isView(item)) {
      return item;

      // Many built-in objects, for example Map, Set, Date, Promise and others make use of so-called internal slots.
      // These are like properties but reserved for internal, specification-only purposes. 
      // For instance, Map stores items in the internal slot [[MapData]]. 
      // Built-in methods access them directly, not via [[Get]]/[[Set]] internal methods. So Proxy can’t intercept that.
    } else if (item instanceof Date) {
      return new Proxy<Date>(new Date(item), {
        get(target, property) {
          const targetProperty = Reflect.get(target, property);
          const bindedTargetProperty = typeof targetProperty === 'function' ? targetProperty.bind(target) : targetProperty;
          if (typeof property === 'string' && property.startsWith('set')) {
            return function (...args) {
              const oldValue = target.getTime();
              const result = bindedTargetProperty.apply(target, args);
              const newValue = target.getTime();
              if (newValue !== oldValue)
                onChange(rootPropertyName || property);

              return result;
            };
          }
          return bindedTargetProperty;
        },
      }) as T;
    } else if (item instanceof Map) {
      const mapCopy = new Map();
      item.forEach((value, key) => {
        mapCopy[key] = observe(value, onChange, rootPropertyName);
      });
      return new Proxy<Map<any, any>>(mapCopy, {
        set: (target, property: keyof Map<any, any>, newValue, receiver) => customObjectSet(onChange, rootPropertyName, property !== 'size')(target, property, newValue, receiver),
        get: customMapGet(onChange, rootPropertyName),
        deleteProperty: customObjectDelete(onChange, rootPropertyName)
      }) as T;
    } else if (item instanceof Set) {
      const setCopy = new Set();
      item.forEach((value) => {
        setCopy.add(observe(value, onChange, rootPropertyName));
      });
      return new Proxy<Set<any>>(setCopy, {
        set: (target, property: keyof Map<any, any>, newValue, receiver) => customObjectSet(onChange, rootPropertyName, property !== 'size')(target, property, newValue, receiver),
        get: customSetGet(onChange, rootPropertyName),
        deleteProperty: customObjectDelete(onChange, rootPropertyName)
      }) as T;
    } 
    const itemCopy = { ...item };
    Object.entries(itemCopy).forEach(([key, value]) => {
      itemCopy[key] = observe(value, onChange, rootPropertyName || key);
    });
    return new Proxy<T>(itemCopy, {
      set: customObjectSet(onChange, rootPropertyName),
      deleteProperty: customObjectDelete(onChange, rootPropertyName),
    });
        
  }
  return item;
}
