import { useObserve } from "../useObserve";
import { ObservableType, Subscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import {
  customMapAndSetClear,
  customMapAndSetDelete,
} from "./mapAndSetCommonHandlers";
import { customObjectDelete, customObjectGetOwnPropertyDescriptor, customObjectOwnKeys, customObjectSet } from "./observeCommonObject";

export const observeSet = <E, T extends Set<E>>(
  item: T,
  initialObservers: Subscription<T>[] = [],
) => {
  const newInitialObservers: Subscription<any>[] = [
    ...initialObservers,
    () => newObservable.notifyCurrentValue(),
  ];
  const proxiedSet = new Map<E, ObservableType<E>>();
  item.forEach((value) => {
    proxiedSet.set(value, useObserve(value, newInitialObservers));
  });
  const newObservable = new ProxiedValue(proxiedSet);
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers),
    get: (target, property) => {
      if (property in target) return Reflect.get(target, property);

      const targetProperty = Reflect.get(target.$value, property === 'add' ? 'set' : property);
      const bindedTargetProperty =
        typeof targetProperty === "function"
          ? (targetProperty as Function).bind(target.$value)
          : targetProperty;
      if (property === Symbol.iterator) {
        return () => target.$value.values();
      }
      switch (property) {
        case "clear": {
          return customMapAndSetClear(target as unknown as ProxiedValue<Set<E>>, bindedTargetProperty);
        }
        case "add": {
          return function (newValue) {
            const newValueOf = newValue?.valueOf?.();
            const hasOldValue = target.$value.has(newValueOf);
            if (!hasOldValue) {
              const observedItem = useObserve<E>(
                newValueOf,
                newInitialObservers,
              );
              observedItem.notifyCurrentValue?.();
              bindedTargetProperty(newValueOf, observedItem);
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
  return proxy
};
