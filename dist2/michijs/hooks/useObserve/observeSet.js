import { useObserve } from "../useObserve";
import { ProxiedValue } from "../../classes/ProxiedValue";
import {
  customMapAndSetClear,
  customMapAndSetDelete,
} from "./mapAndSetCommonHandlers";
import {
  customObjectDelete,
  customObjectGetOwnPropertyDescriptor,
  customObjectOwnKeys,
  customObjectSet,
} from "./observeCommonObject";
import { cloneMap } from "../../utils";

/**
 * @typedef {import('../../types').ObservableType} ObservableType
 * @typedef {import('../../types').Subscription} Subscription
 */

/**
 * @template E
 * @template {Set<E>} T
 * @param {T} item
 * @param {Subscription<T>[]} [initialObservers=[]]
 * @returns {ObservableType<Set<E>>}
 */
export const observeSet = (item, initialObservers = []) => {
  const newInitialObservers = [
    ...initialObservers,
    () => newObservable.notifyCurrentValue(),
  ];
  const proxiedSet = cloneMap(item, (value) =>
    useObserve(value, newInitialObservers),
  );
  const newObservable = new ProxiedValue(proxiedSet);
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers),
    get: (target, property) => {
      if (property in target) return Reflect.get(target, property);

      const targetProperty = Reflect.get(
        target.$value,
        property === "add" ? "set" : property,
      );
      const bindedTargetProperty =
        typeof targetProperty === "function"
          ? targetProperty.bind(target.$value)
          : targetProperty;
      if (property === Symbol.iterator) {
        return () => target.$value.values();
      }
      switch (property) {
        case "clear": {
          return customMapAndSetClear(target, bindedTargetProperty);
        }
        case "add": {
          return (newValue) => {
            const newValueOf = newValue?.valueOf?.();
            const hasOldValue = target.$value.has(newValueOf);
            if (!hasOldValue) {
              const observedItem = useObserve(newValueOf, newInitialObservers);
              bindedTargetProperty(newValueOf, observedItem);
              // @ts-ignore
              observedItem.notifyCurrentValue?.();
            }
            return proxy;
          };
        }
        case "delete": {
          return customMapAndSetDelete(target, bindedTargetProperty);
        }
        default: {
          return bindedTargetProperty;
        }
      }
    },
    ownKeys: customObjectOwnKeys,
    getOwnPropertyDescriptor: customObjectGetOwnPropertyDescriptor,
    deleteProperty: customObjectDelete,
  });
  return proxy;
};
