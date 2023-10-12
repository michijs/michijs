import { useObserve } from "../useObserve";
import { ObservableType, ObserverCallback } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import {
  customMapAndSetClear,
  customMapAndSetDelete,
} from "./mapAndSetCommonHandlers";
import { customObjectDelete, customObjectSet } from "./observeCommonObject";
import { setObservableValue } from "../../utils";

export const observeMap = <E, T extends Map<any, E>>(
  item: T,
  initialObservers: ObserverCallback<T>[] = [],
) => {
  const newInitialObservers: ObserverCallback<any>[] = [
    ...initialObservers,
    () => newObservable.notifyCurrentValue(),
  ];
  const proxiedMap = new Map<unknown, ObservableType<E>>();
  item.forEach((value, key) =>
    proxiedMap.set(key, useObserve(value, newInitialObservers)),
  );

  const newObservable = new ProxiedValue<T>(proxiedMap as T, initialObservers);
  return new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers),
    get: (target, property) => {
      if (property in target) return Reflect.get(target, property);
      else {
        const targetProperty = Reflect.get(target.$value, property);
        const bindedTargetProperty =
          typeof targetProperty === "function"
            ? (targetProperty as Function).bind(target.$value)
            : targetProperty;
        switch (property) {
          case "clear": {
            return customMapAndSetClear(
              target as unknown as ProxiedValue<Map<any, E>>,
              bindedTargetProperty,
            );
          }
          case "set": {
            return function (key, newValue) {
              const hasOldValue = target.$value.has(key);
              if (hasOldValue) {
                const oldValue = target.$value.get(key);
                return setObservableValue(
                  oldValue,
                  newValue,
                  newInitialObservers,
                );
              }
              const observedItem = useObserve<object>(
                newValue,
                newInitialObservers,
              );
              observedItem.notifyCurrentValue?.();
              return bindedTargetProperty(key, observedItem);
            };
          }
          case "delete": {
            return customMapAndSetDelete(
              target as unknown as ProxiedValue<Map<any, E>>,
              bindedTargetProperty,
            );
          }
          // case 'subscribe': {
          //   return (callback) => props.subscribeCallback?.(props.propertyPath, callback);
          // }
          default: {
            return bindedTargetProperty;
          }
        }
      }
    },
    deleteProperty: customObjectDelete,
  }) as unknown as ObservableType<T>;
};
