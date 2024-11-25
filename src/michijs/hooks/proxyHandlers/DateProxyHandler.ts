import { ProxiedValueV2 } from "../../classes/ProxiedValue";
import type { ObservableProxyHandler } from "../../types";
import { unproxify } from "../../utils/unproxify";
import { ObjectProxyHandler } from "./ObjectProxyHandler";

export class DateProxyHandler extends ObjectProxyHandler<Date> implements ObservableProxyHandler<ProxiedValueV2<Date>, Date> {
  apply(target: ProxiedValueV2<Date>, _, args: any[]) {
    if (args.length > 0)
      return this.applyUproxifiedValue(target, unproxify(args[0]))
    return target.valueOf();
  }
  applyUproxifiedValue(target: ProxiedValueV2<Date>, unproxifiedValue: Date) {
    if (unproxifiedValue instanceof Date) {
      const newTime = unproxifiedValue.getTime();
      const oldValue = target.$value.getTime();
      target.$value.setTime(newTime);
      const notifiableObservers = target.notifiableObservers;
      if (notifiableObservers && newTime !== oldValue)
        target.notifyCurrentValue(notifiableObservers);
      return;
    } else
      return this.updateHandlerAndValue(target, unproxifiedValue)
  }
  get(target: ProxiedValueV2<Date>, property: string | symbol) {
    if (property in target) return Reflect.get(target, property);
    const targetProperty = Reflect.get(target.$value, property);
    if (typeof property === "string" && property.startsWith("set")) {
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
    return typeof targetProperty === "function"
      ? targetProperty.bind(target.$value)
      : targetProperty;
  }
}
