import { deepEqual } from "../../utils/deepEqual";
import { observe } from "../observe";
import { Observable } from "../../types";
import { ProxiedValue } from "./ProxiedValue";
import {
  customMapAndSetClear,
  customMapAndSetDelete,
} from "./mapAndSetCommonHandlers";
import { customObjectDelete, customObjectSet } from "./observeCommonObject";

export const observeMap = <T extends Map<unknown, unknown>>(item: T): T => {
  const proxiedMap = new Map() as Map<unknown, Observable<unknown>>;
  item.forEach((value, key) => proxiedMap.set(key, observe(value)));

  const newObservable = new ProxiedValue(proxiedMap);
  return new Proxy(newObservable, {
    set: customObjectSet,
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
            return customMapAndSetClear(target, bindedTargetProperty);
          }
          case "set": {
            return function (key, newValue) {
              const oldValue = target.$value.get(key);

              const updateCallback = () => {
                const observedItem = observe<object>(newValue);
                observedItem.observers = oldValue?.observers;

                const result = bindedTargetProperty(key, observedItem);

                observedItem.notify?.();
                return result;
              };

              if (oldValue?.shouldCheckForChanges?.()) {
                if (!deepEqual(newValue, oldValue)) return updateCallback();
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
      }
    },
    deleteProperty: customObjectDelete,
  }) as unknown as Observable<T>;
};
