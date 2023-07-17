import { observe } from "../observe";
import { Observable } from "../../types";
import { ProxiedValue } from "./ProxiedValue";
import {
  customMapAndSetClear,
  customMapAndSetDelete,
} from "./mapAndSetCommonHandlers";
import { customObjectDelete, customObjectSet } from "./observeCommonObject";

export const observeMap = <T extends Map<unknown, any>>(item: T): T => {
  const proxiedMap = new Map<unknown, Observable<any>>();
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
              const hasOldValue = target.$value.has(key);
              const observedItem = observe<object>(newValue);

              if (hasOldValue)
                // Intentionally ignoring receiver - it ignores target.$value as the target and takes target
                return Reflect.set(target.$value.get(key), '$value', observedItem.$value);
              else
                return bindedTargetProperty(key, observedItem)
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
