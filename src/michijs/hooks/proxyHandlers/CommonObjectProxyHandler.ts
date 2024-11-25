import { ObjectProxyHandler } from "./ObjectProxyHandler";
import type { ProxiedValueV2 } from "../../classes/ProxiedValue";
import type { ObservableProxyHandler } from "../../types";
import { unproxify } from "../../utils/unproxify";
import { extendsObject } from "../../utils/extendsObject";
import { cloneCommonObject } from "../../utils/clone/cloneCommonObject";

export class CommonObjectProxyHandler<T extends object> extends ObjectProxyHandler<T> implements ObservableProxyHandler<ProxiedValueV2<T>, any> {
  apply(target: ProxiedValueV2<T>, _: any, args: any[]) {
    if (args.length > 0) 
      return this.applyUproxifiedValue(target, unproxify(args[0]))
    return target.valueOf();
  }
  applyUproxifiedValue(target: ProxiedValueV2<T>, unproxifiedValue: any) {
    if (unproxifiedValue && extendsObject(unproxifiedValue)) {
      // Transaction
      target.$value = this.getInitialValue(target, unproxifiedValue);
      for (const key in { ...target.$value, ...unproxifiedValue }) {
        target.$value[key](unproxifiedValue[key]);
      }
      const notifiableObservers = target.notifiableObservers;
      if (notifiableObservers)
        target.notifyCurrentValue(notifiableObservers);
      return;
    } else 
      return this.updateHandlerAndValue(target, unproxifiedValue);
  }
  getInitialValue(target: ProxiedValueV2<T>, unproxifiedValue: any): T {
    return cloneCommonObject(unproxifiedValue as object, (value) =>
      this.createProxyChild(target,value),
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
