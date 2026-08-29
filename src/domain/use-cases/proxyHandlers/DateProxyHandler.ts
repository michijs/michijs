import type { ProxiedValuePort, ProxyHandlerPort } from "#ports";
import { unproxify } from "../../utils/unproxify";
import { ObjectProxyHandler } from "./ObjectProxyHandler";

export class DateProxyHandler
  extends ObjectProxyHandler<Date>
  implements ProxyHandlerPort<Date>
{
  apply(target: ProxiedValuePort<Date>, _, args: any[]) {
    if (args.length > 0) {
      const unproxifiedValue = unproxify(args[0]);
      if (unproxifiedValue instanceof Date)
        return this.applyNewValue(target, unproxifiedValue);
      return this.updateHandlerAndValue(target, unproxifiedValue);
    }
    return target.valueOf();
  }
  applyNewValue(target: ProxiedValuePort<Date>, unproxifiedValue: Date) {
    const newTime = unproxifiedValue.getTime();
    const oldValue = target.$value.getTime();
    target.$value.setTime(newTime);
    if (newTime !== oldValue) target.notifyCurrentValue();
  }
  get(target: ProxiedValuePort<Date>, property: string | symbol) {
    if (property in target) return Reflect.get(target, property);
    const targetProperty = Reflect.get(target.$value, property);
    if (typeof property === "string" && property.startsWith("set")) {
      return (...args) => {
        const oldValue = target.$value.getTime();
        const result = (targetProperty as Function).apply(target.$value, args);
        const newValue = target.$value.getTime();
        if (newValue !== oldValue) target.notifyCurrentValue();

        return result;
      };
    }
    return typeof targetProperty === "function"
      ? targetProperty.bind(target.$value)
      : targetProperty;
  }
}
