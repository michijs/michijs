import type { ObservableType, Subscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import { customObjectApply, customObjectGetOwnPropertyDescriptor, customObjectOwnKeys } from "./customHandlers";
import { cloneDate } from "../../utils/clone/cloneDate";

export function observeDate<T extends Date>(
  item: T,
  initialObservers: Subscription<T>[] = [],
) {
  const clone = cloneDate(item);
  const newObservable = new ProxiedValue<T>(clone, initialObservers);
  const proxy = new Proxy(newObservable, {
    ownKeys: customObjectOwnKeys,
    apply: customObjectApply(() => proxy, initialObservers),
    getOwnPropertyDescriptor: customObjectGetOwnPropertyDescriptor,
    get(target, property) {
      if (property in target) return Reflect.get(target, property);
      if (target.$value) {
        const targetProperty = Reflect.get(target.$value, property);
        if (typeof property === "string") {
          if (property.startsWith("set")) {
            return (...args) => {
              const oldValue = target.$value.getTime();
              const result = (targetProperty as Function).apply(
                target.$value,
                args,
              );
              const newValue = target.$value.getTime();
              if (newValue !== oldValue) target.notifyCurrentValue();

              return result;
            };
          }
          // else if (property === 'subscribe')
          //   return (callback) => subscribeCallback?.(propertyPath, callback);
        }
        return typeof targetProperty === "function"
          ? targetProperty.bind(target.$value)
          : targetProperty;
      }
    },
  }) as unknown as ObservableType<T>;
  return proxy;
}
