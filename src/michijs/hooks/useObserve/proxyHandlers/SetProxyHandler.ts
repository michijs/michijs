import { ObjectProxyHandler } from "./ObjectProxyHandler";
import { customMapAndSetClear } from "./customMapAndSetClear";
import type { ProxiedValue } from "../../../classes/ProxiedValue";
import { useObserveInternal } from "../../useObserve";
import { customMapAndSetDelete } from "./customMapAndSetDelete";

export class SetProxyHandler<T> extends ObjectProxyHandler<T> {
  override get(target, property) {
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
          target as unknown as ProxiedValue<Set<any>>,
          bindedTargetProperty,
        );
      }
      case "add": {
        return (newValue) => {
          const newValueOf = newValue?.valueOf?.();
          const hasOldValue = target.$value.has(newValueOf);
          if (!hasOldValue) {
            // Can be wathever but doesnt work properly if I use E for example
            const observedItem = useObserveInternal(
              newValueOf,
              this.parentSubscription,
              this.rootObservableCallback,
            );
            bindedTargetProperty(newValueOf, observedItem);
            // @ts-ignore
            observedItem.notifyCurrentValue?.();
          }
          return target;
          // return proxy;
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
  }
}
