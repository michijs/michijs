import { ObjectProxyHandler } from "./ObjectProxyHandler";
import { customMapAndSetClear } from "./customMapAndSetClear";
import { customMapAndSetDelete } from "./customMapAndSetDelete";
import type { ProxiedValuePort, ProxyHandlerPort } from "#ports";
import { cloneMap } from "#shared";
import { unproxify } from "../../utils/unproxify";

export class MapProxyHandler<T extends Map<any, any>>
  extends ObjectProxyHandler<T>
  implements ProxyHandlerPort<T>
{
  $overrides = {
    clear: customMapAndSetClear,
    set:
      (
        target: ProxiedValuePort<T>,
        bindedTargetProperty: Map<any, any>["set"],
      ): Map<any, any>["set"] =>
      (key, newValue) => {
        const hasOldValue = target.$value.has(key);
        if (hasOldValue) {
          const oldValue = target.$value.get(key);
          return oldValue(newValue);
        }
        const observedItem = this.createProxyChild(target, newValue);
        const result = bindedTargetProperty(key, observedItem);
        observedItem.notifyCurrentValue();
        return result;
      },
    delete: customMapAndSetDelete,
  };
  apply(target: ProxiedValuePort<T>, _: any, args: any[]) {
    if (args.length > 0) {
      const unproxifiedValue = unproxify(args[0]);
      if (unproxifiedValue instanceof Map)
        return this.applyNewValue(target, unproxifiedValue);
      return this.updateHandlerAndValue(target, unproxifiedValue);
    }
    return target.valueOf();
  }
  applyNewValue(target: ProxiedValuePort<T>, unproxifiedValue: Map<any, any>) {
    target.$value = this.getInitialValue(target, unproxifiedValue);
    target.notifyCurrentValue();
  }
  getInitialValue(
    target: ProxiedValuePort<T>,
    unproxifiedValue: Map<any, any>,
  ): T {
    return cloneMap(unproxifiedValue, (value) =>
      this.createProxyChild(target, value),
    ) as T;
  }
  get(target: ProxiedValuePort<T>, property: string | symbol) {
    if (property in target) return Reflect.get(target, property);
    const targetProperty = Reflect.get(target.$value, property);
    const bindedTargetProperty =
      typeof targetProperty === "function"
        ? (targetProperty as Function).bind(target.$value)
        : targetProperty;

    return (
      this.$overrides[property]?.(target, bindedTargetProperty) ??
      bindedTargetProperty
    );
  }
}
