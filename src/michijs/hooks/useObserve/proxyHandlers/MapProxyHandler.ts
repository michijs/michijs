import { ObjectProxyHandler } from "./ObjectProxyHandler";
import { customMapAndSetClear } from "./customMapAndSetClear";
import type { ProxiedValue } from "../../../classes/ProxiedValue";
import { setObservableValue } from "../../../utils/setObservableValue";
import { useObserveInternal } from "../../useObserve";
import { customMapAndSetDelete } from "./customMapAndSetDelete";

export class MapProxyHandler<T> extends ObjectProxyHandler<T> {
  override get(target, property) {
    if (property in target) return Reflect.get(target, property);
    const targetProperty = Reflect.get(target.$value, property);
    const bindedTargetProperty =
      typeof targetProperty === "function"
        ? (targetProperty as Function).bind(target.$value)
        : targetProperty;
    switch (property) {
      case "clear": {
        return customMapAndSetClear(
          target as unknown as ProxiedValue<Map<any, any>>,
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
              this.parentSubscription,
              this.rootObservableCallback,
            );
          }
          const observedItem = useObserveInternal(
            newValue,
            this.parentSubscription,
            this.rootObservableCallback,
          );
          const result = bindedTargetProperty(key, observedItem);
          // @ts-ignore
          observedItem.notifyCurrentValue?.();
          return result;
        };
      }
      case "delete": {
        return customMapAndSetDelete(
          target as unknown as ProxiedValue<Map<any, any>>,
          bindedTargetProperty,
        );
      }
      default: {
        return bindedTargetProperty;
      }
    }
  }
}
