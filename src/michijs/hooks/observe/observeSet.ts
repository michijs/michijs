import { observe } from "../observe";
import { Observable, ObserverCallback } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import {
  customMapAndSetClear,
  customMapAndSetDelete,
} from "./mapAndSetCommonHandlers";
import { customObjectDelete, customObjectSet } from "./observeCommonObject";

export const observeSet = <T extends Set<unknown>>(
  item: T,
  initialObservers?: Set<ObserverCallback<unknown>>,
) => {
  const proxiedSet = new Set<Observable<unknown>>();
  item.forEach((value) => {
    proxiedSet.add(observe(value, initialObservers));
  });
  const newObservable = new ProxiedValue<T>(proxiedSet);
  return new Proxy(newObservable, {
    set: (target, property: keyof Set<any>, newValue, receiver) =>
      customObjectSet(target, property, newValue, receiver),
    get: (target, property: keyof Set<any> & "subscribe") => {
      const targetProperty = Reflect.get(target.$value, property);
      const bindedTargetProperty =
        typeof targetProperty === "function"
          ? (targetProperty as Function).bind(target.$value)
          : targetProperty;
      switch (property) {
        case "clear": {
          return customMapAndSetClear(target, bindedTargetProperty);
        }
        case "add": {
          return function (newValue) {
            const updateCallback = () => {
              const observedItem = observe<object>(newValue);

              const result = bindedTargetProperty(observedItem);

              observedItem.notify?.(target.$value);
              return result;
            };

            if (target?.shouldCheckForChanges?.()) {
              if (!target.$value.has(newValue)) return updateCallback();
              else return;
            } else return updateCallback();
          };
        }
        case "delete": {
          return customMapAndSetDelete(target, bindedTargetProperty);
        }
        // case 'subscribe': {
        //   return (callback) => props.subscribeCallback?.(props.propertyPath, callback);
        // }
        default: {
          return bindedTargetProperty;
        }
      }
    },
    deleteProperty: customObjectDelete,
  });
};
