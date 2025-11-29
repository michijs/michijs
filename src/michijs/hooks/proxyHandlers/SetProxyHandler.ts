import { ObjectProxyHandler } from "./ObjectProxyHandler";
import { customMapAndSetClear } from "./customMapAndSetClear";
import type { ProxiedValue } from "../../classes/ProxiedValue";
import { customMapAndSetDelete } from "./customMapAndSetDelete";
import type { ObservableProxyHandlerInterface } from "../../types";
import { cloneMap } from "../../utils/clone/cloneMap";
import { unproxify } from "../../utils/unproxify";

export class SetProxyHandler<T extends Set<any>>
  extends ObjectProxyHandler<T>
  implements ObservableProxyHandlerInterface<T>
{
  $overrides = {
    clear: customMapAndSetClear,
    add:
      (
        target: ProxiedValue<T>,
        bindedTargetProperty: Map<any, any>["set"],
      ): Set<any>["add"] =>
      (newValue) => {
        const unproxifiedValue = unproxify(newValue);
        const hasOldValue = target.$value.has(unproxifiedValue);
        if (!hasOldValue) {
          const observedItem = this.createProxyChild(target, unproxifiedValue);
          bindedTargetProperty(unproxifiedValue, observedItem);
          observedItem.notifyCurrentValue();
        }
        return target.$value;
      },
    delete: customMapAndSetDelete,
  };
  applyNewValue(target: ProxiedValue<T>, unproxifiedValue: Set<any>) {
    target.$value = this.getInitialValue(target, unproxifiedValue);
    target.notifyCurrentValue();
    return;
  }
  apply(target: ProxiedValue<T>, _: any, args: any[]) {
    if (args.length > 0) {
      const unproxifiedValue = unproxify(args[0]);
      if (unproxifiedValue instanceof Set)
        return this.applyNewValue(target, unproxifiedValue);
      return this.updateHandlerAndValue(target, unproxifiedValue);
    }
    return target.valueOf();
  }
  getInitialValue(target: ProxiedValue<T>, unproxifiedValue: Set<any>): T {
    return cloneMap(unproxifiedValue, (value) =>
      this.createProxyChild(target, value),
    ) as unknown as T;
  }
  get(target: ProxiedValue<T>, p: string | symbol) {
    if (p in target) return Reflect.get(target, p);
    const targetProperty = Reflect.get(target.$value, p === "add" ? "set" : p);
    const bindedTargetProperty =
      typeof targetProperty === "function"
        ? (targetProperty as Function).bind(target.$value)
        : targetProperty;
    if (p === Symbol.iterator) return () => target.$value.values();

    return (
      this.$overrides[p]?.(target, bindedTargetProperty) ?? bindedTargetProperty
    );
  }
}
