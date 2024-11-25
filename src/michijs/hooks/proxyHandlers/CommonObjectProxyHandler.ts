import { ObjectProxyHandler } from "./ObjectProxyHandler";
import type { ProxiedValueV2 } from "../../classes/ProxiedValue";
import type { ObservableProxyHandler } from "../../types";
import { unproxify } from "../../utils/unproxify";
import { extendsObject } from "../../utils/extendsObject";
import { cloneCommonObject } from "../../utils/clone/cloneCommonObject";

export class CommonObjectProxyHandler<T extends object> extends ObjectProxyHandler<T> implements ObservableProxyHandler<ProxiedValueV2<T>, any> {
  apply(target: ProxiedValueV2<T>, _: any, args: any[]) {
    if (args.length > 0) {
      const unproxifiedValue = unproxify(args[0]);
      if (unproxifiedValue && extendsObject(unproxifiedValue)) {
        return this.applyNewValue(target, unproxifiedValue);
      } else
        return this.updateHandlerAndValue(target, unproxifiedValue);
    }
    return target.valueOf();
  }
  applyNewValue(target: ProxiedValueV2<T>, unproxifiedValue: any) {
    // Transaction
    for (const key in { ...target.$value, ...unproxifiedValue }) {
      target.$value[key](unproxifiedValue[key]);
    }
    const notifiableObservers = target.notifiableObservers;
    if (notifiableObservers)
      target.notifyCurrentValue(notifiableObservers);
  }
  getInitialValue(target: ProxiedValueV2<T>, unproxifiedValue: any): T {
    return cloneCommonObject(unproxifiedValue as object, (value) =>
      this.createProxyChild(target, value),
    ) as T
  }
  set(target: ProxiedValueV2<T>, p: string | symbol, newValue: any): boolean {
    if (p in target.$value)
      return target.$value[p](newValue)
    else {
      target.$value[p] = this.createProxyChild(target, newValue)
      target.notifyCurrentValue?.();
      return true;
    }
  }
  get(target: ProxiedValueV2<T>, p: string | symbol) {
    if (p in target) return Reflect.get(target, p);
    if (p in target.$value)
      return Reflect.get(target.$value, p, target.$value);
    // Reflect doesnt work properly here
    else this.set(target, p, undefined);
  }
}
