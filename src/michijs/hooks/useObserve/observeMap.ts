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
import { setObservableValue } from "../../utils/setObservableValue";

export const observeMap = <E, T extends Map<any, E>>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>,
) => {
  const newParentSubscription = createParentSubscription(() => newObservable);
  const proxiedMap = cloneMap(item, (value) =>
    useObserveInternal(value, newParentSubscription, rootObservableCallback),
  );
  const newObservable = new ProxiedValue<T>(
    proxiedMap as T,
    parentSubscription,
  );
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newParentSubscription, rootObservableCallback),
    apply: customObjectApply(
      () => proxy,
      newParentSubscription,
      rootObservableCallback,
    ),
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
                newParentSubscription,
                rootObservableCallback,
              );
            }
            const observedItem = useObserveInternal<object>(
              newValue,
              newParentSubscription,
              rootObservableCallback,
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
