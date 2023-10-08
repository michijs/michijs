import { useObserve } from "../useObserve";
import { ObservableType, ObserverCallback } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import {
  customMapAndSetClear,
  customMapAndSetDelete,
} from "./mapAndSetCommonHandlers";
import { customObjectDelete, customObjectSet } from "./observeCommonObject";

export const observeSet = <T extends Set<unknown>>(
  item: T,
  initialObservers: ObserverCallback<T>[] = [],
) => {
  const proxiedSet = new Set<ObservableType<unknown>>();
  item.forEach((value) => {
    proxiedSet.add(useObserve(value));
  });
  const newObservable = new ProxiedValue<T>(proxiedSet);
  return new Proxy(newObservable, {
    set: customObjectSet,
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
              const observedItem = useObserve<object>(newValue);

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
