import { useObserveInternal } from "../useObserve";
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
} from "./customHandlers";

import { cloneMap } from "../../utils/clone/cloneMap";

export const observeSet = <E, T extends Set<E>>(
  item: T,
  initialObservers?: Subscription<T>[],
  rootObservableCallback?: () => ObservableType<any>,
): ObservableType<Set<E>> => {
  const newInitialObservers: Subscription<any>[] = [
    ...(initialObservers ?? []),
    () => newObservable.notifyCurrentValue(),
  ];
  const proxiedSet = cloneMap(item, (value) =>
    useObserveInternal(value, newInitialObservers, rootObservableCallback),
  );
  // @ts-ignore
  const newObservable = new ProxiedValue(proxiedSet, initialObservers);
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers, rootObservableCallback),
    apply: customObjectApply(
      () => proxy,
      newInitialObservers,
      rootObservableCallback,
    ),
    get: (target, property) => {
      if (property in target) return Reflect.get(target, property);

      const targetProperty = Reflect.get(
        target.$value,
        property === "add" ? "set" : property,
      );
      const bindedTargetProperty =
        typeof targetProperty === "function"
          ? (targetProperty as Function).bind(target.$value)
          : targetProperty;
      if (property === Symbol.iterator) {
        return () => target.$value.values();
      }
      switch (property) {
        case "clear": {
          return customMapAndSetClear(
            target as unknown as ProxiedValue<Set<E>>,
            bindedTargetProperty,
          );
        }
        case "add": {
          return (newValue) => {
            const newValueOf = newValue?.valueOf?.();
            const hasOldValue = target.$value.has(newValueOf);
            if (!hasOldValue) {
              const observedItem = useObserveInternal<E>(
                newValueOf,
                newInitialObservers,
                rootObservableCallback,
              );
              bindedTargetProperty(newValueOf, observedItem);
              // @ts-ignore
              observedItem.notifyCurrentValue?.();
            }
            return proxy;
          };
        }
        case "delete": {
          // @ts-ignore
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
  return proxy as unknown as ObservableType<Set<E>>;
};
