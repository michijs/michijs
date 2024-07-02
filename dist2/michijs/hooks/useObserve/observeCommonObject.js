import { useObserve } from "../useObserve";
import { ProxiedValue } from "../../classes";
import { cloneCommonObject, setObservableValue } from "../../utils";

/**
 * @typedef {import('../../types').ObservableType} ObservableType
 * @typedef {import('../../types').Subscription} Subscription
 */

/**
 * @template {object} T
 * @typedef {Required< ProxyHandler<ProxiedValue<T>> >} CommonObjectProxyHandler
 */

/**
 * @template T
 * @param {Subscription<T>[]} initialObservers
 * @returns {CommonObjectProxyHandler<any>["set"]}
 */
export const customObjectSet =
  (initialObservers) => (target, property, newValue, receiver) => {
    if (!["length", "name"].includes(property) && property in target)
      return Reflect.set(target, property, newValue, receiver);

    // Not sure if this is possible today
    if (target.$value) {
      const oldValue = target.$value[property];
      if (oldValue) {
        // If you call something.myfunctionname = other function it should not call the function
        if (typeof oldValue.$value === "function") oldValue.$value = newValue;
        else oldValue(newValue);
        return true;
      }
      const newItem = useObserve(newValue, initialObservers);
      const result = Reflect.set(target.$value, property, newItem);
      // @ts-ignore
      newItem.notifyCurrentValue?.();
      return result;
    }
    return false;
  };

/**
 * @returns {boolean}
 */
export const customObjectDelete = (target, property) => {
  if (property in target) return Reflect.deleteProperty(target, property);
  const deletedProperty = target.$value[property];
  if (deletedProperty) {
    Reflect.set(deletedProperty, "$value", undefined);
    // const result = Reflect.deleteProperty(target.$value, property);
    // deletedProperty.$value = undefined;

    return true;
  }
  return false;
};

/**
 * @template {ObservableType<any>} T
 * @param {Subscription<T>[]} initialObservers
 * @returns {CommonObjectProxyHandler<any>["get"]}
 */
export const customObjectGet = (initialObservers) => (target, p, receiver) => {
  // Because function already has length
  if (!["length", "name"].includes(p) && p in target) {
    return Reflect.get(target, p, receiver);
  }
  if (target.$value) {
    if (typeof target.$value === "object")
      if (p in target.$value)
        return Reflect.get(target.$value, p, target.$value);
      else customObjectSet(initialObservers)(target, p, undefined, receiver);
    else if (target.$value[p]) return target.$value[p];
    // If a nested object is undefined
  } else {
    target.$value = {};
    customObjectSet(initialObservers)(target, p, undefined, receiver);
  }

  return target.$value[p];
};

const functionProps = ["arguments", "caller", "prototype"];

/**
 * @returns {(string | symbol)[]}
 */
export const customObjectOwnKeys = (target) => {
  return Reflect.ownKeys(target.$value).concat(...functionProps);
};
/**
 * @returns {TypedPropertyDescriptor<*>}
 */
export const customObjectGetOwnPropertyDescriptor = (target, prop) => {
  return functionProps.includes(prop)
    ? Reflect.getOwnPropertyDescriptor(target, prop)
    : {
        ...Reflect.getOwnPropertyDescriptor(target, prop),
        enumerable: true,
        configurable: true,
      };
};
/**
 * @returns {boolean}
 */
export const customObjectHas = (target, property) => {
  return customObjectOwnKeys(target).includes(property);
};

/**
 * @returns {(target: ProxiedValue<T>, _: any, args: any[]) => any}
 */
export const customObjectApply =
  (proxy, initialObservers) => (target, _, args) => {
    const valueType = typeof target.$value;
    if (valueType === "function") return proxy().$value(...args);
    if (args.length > 0) {
      const newValue = args[0];
      if (target.$value && valueType === "object")
        setObservableValue(proxy(), newValue, initialObservers);
      else proxy().$value = useObserve(newValue, initialObservers).$value;
      return;
    }
    return target.valueOf();
  };

/**
 * @template T
 * @param {T} item
 * @param {Subscription<T>[]} [initialObservers=[]]
 * @returns {ObservableType<T>}
 */
export function observeCommonObject(item, initialObservers = []) {
  const newInitialObservers = [
    ...initialObservers,
    () => newObservable.notifyCurrentValue(),
  ];
  const newObservable = new ProxiedValue(
    item && Object.getPrototypeOf(item) === Object.prototype
      ? cloneCommonObject(item, (value) =>
          useObserve(value, newInitialObservers),
        )
      : item,
    initialObservers,
  );
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers),
    deleteProperty: customObjectDelete,
    apply: customObjectApply(() => proxy, newInitialObservers),
    ownKeys: customObjectOwnKeys,
    getOwnPropertyDescriptor: customObjectGetOwnPropertyDescriptor,
    get: customObjectGet(newInitialObservers),
    has: customObjectHas,
  });
  return proxy;
}
