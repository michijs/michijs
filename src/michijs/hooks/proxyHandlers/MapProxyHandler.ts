import { ObjectProxyHandler } from "./ObjectProxyHandler";
import { customMapAndSetClear } from "./customMapAndSetClear";
import type { ProxiedValue, ProxiedValueV2 } from "../../classes/ProxiedValue";
import { customMapAndSetDelete } from "./customMapAndSetDelete";
import type { ObservableProxyHandler } from "../../types";
import { cloneMap } from "../../utils/clone/cloneMap";
import { unproxify } from "../../utils/unproxify";
import { getHandler } from "./getHandler";

export class MapProxyHandler<T extends Map<any, any>> extends ObjectProxyHandler<T> implements ObservableProxyHandler<ProxiedValueV2<T>, Map<any, any>> {
  $overrides = {
    clear: customMapAndSetClear,
    set: (target, bindedTargetProperty) => (key, newValue) => {
      const hasOldValue = target.$value.has(key);
      if (hasOldValue) {
        const oldValue = target.$value.get(key);
        return oldValue(newValue);
      }
      const observedItem = this.createProxyChild(target, newValue);
      const result = bindedTargetProperty(key, observedItem);
      // @ts-ignore
      observedItem.notifyCurrentValue?.();
      return result;
    },
    delete: customMapAndSetDelete
  }
  apply(target: ProxiedValueV2<T>, _: any, args: any[]) {
    if (args.length > 0) {
      const newValue = unproxify(args[0]);
      if (newValue instanceof Map) {
        target.$value = this.getInitialValue(target, newValue);
        const notifiableObservers = target.notifiableObservers;
        if (notifiableObservers)
          target.notifyCurrentValue(notifiableObservers);
        return;
      } else {
        const newHandler = getHandler(newValue, this.parentSubscription, this.rootObservableCallback);
        target.handler = newHandler;
        return target.handler.apply(target, _, args)
      }
    }
    return target.valueOf();
  }
  getInitialValue(target, unproxifiedValue: Map<any, any>): T {
    return cloneMap(unproxifiedValue, (value) =>
      this.createProxyChild(target, value),
    ) as T;
  }
  set(target: ProxiedValueV2<T>, p: string | symbol, newValue: any): boolean {
    // When setting a new value, call set function
    return this.get(target, 'set')(p, newValue)
  }
  get(target, property) {
    if (property in target) return Reflect.get(target, property);
    const targetProperty = Reflect.get(target.$value, property);
    const bindedTargetProperty =
      typeof targetProperty === "function"
        ? (targetProperty as Function).bind(target.$value)
        : targetProperty;

    return this.$overrides[property]?.(target, bindedTargetProperty) ?? bindedTargetProperty
  }
}
