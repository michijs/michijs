import { useObserve } from "../useObserve";
import type { ObservableType, Subscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import {
  customMapAndSetClear,
  customMapAndSetDelete,
} from "./mapAndSetCommonHandlers";
import {
  customObjectApply,
  customObjectDelete,
  customObjectGetOwnPropertyDescriptor,
  customObjectOwnKeys,
  customObjectSet,
} from "./observeCommonObject";
import { cloneMap } from "../../utils/clone/cloneMap";
import { setObservableValue } from "../../utils/setObservableValue";

export const observeMap = <E, T extends Map<any, E>>(
  item: T,
  initialObservers: Subscription<T>[] = [],
) => {
  const newInitialObservers: Subscription<any>[] = [
    ...initialObservers,
    () => newObservable.notifyCurrentValue(),
  ];
  const proxiedMap = cloneMap(item, (value) =>
    useObserve(value, newInitialObservers),
  );
  const newObservable = new ProxiedValue<T>(proxiedMap as T, initialObservers);
  const proxy = new window.Proxy(newObservable, {
    set: customObjectSet(newInitialObservers),
    apply: customObjectApply(() => proxy, newInitialObservers),
    get: (target, property) => {
      if (property in target) return Reflect.get(target, property);
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
          return (key, newValue) => {
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
            const result = bindedTargetProperty(key, observedItem);
            observedItem.notifyCurrentValue?.();
            return result;
          };
        }
        case "delete": {
          return customMapAndSetDelete(
            target as unknown as ProxiedValue<Map<any, E>>,
            bindedTargetProperty,
          );
        }
        default: {
          return bindedTargetProperty;
        }
      }
    },
    ownKeys: customObjectOwnKeys,
    getOwnPropertyDescriptor: customObjectGetOwnPropertyDescriptor,
    deleteProperty: customObjectDelete,
  }) as unknown as ObservableType<T>;
  return proxy;
};
