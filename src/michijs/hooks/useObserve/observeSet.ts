import { useObserveInternal } from "../useObserve";
import type { ObservableType, ParentSubscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import {
  customMapAndSetClear,
  customMapAndSetDelete,
} from "./mapAndSetCommonHandlers";
import {
  createParentSubscription,
  customObjectApply,
  customObjectDelete,
  customObjectGetOwnPropertyDescriptor,
  customObjectOwnKeys,
  customObjectSet,
} from "./customHandlers";

import { cloneMap } from "../../utils/clone/cloneMap";

export const observeSet = <E, T extends Set<E>>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>,
): ObservableType<Set<E>> => {
  const newParentSubscription = createParentSubscription(() => newObservable);
  const proxiedSet = cloneMap(item, (value) =>
    useObserveInternal(value, newParentSubscription, rootObservableCallback),
  );
  // @ts-ignore
  const newObservable = new ProxiedValue(proxiedSet, parentSubscription);
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newParentSubscription, rootObservableCallback),
    apply: customObjectApply(
      () => proxy,
      newParentSubscription,
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
              // Can be wathever but doesnt work properly if I use E for example
              const observedItem = useObserveInternal<number>(
                newValueOf,
                newParentSubscription,
                rootObservableCallback,
              );
              bindedTargetProperty(newValueOf, observedItem);
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
