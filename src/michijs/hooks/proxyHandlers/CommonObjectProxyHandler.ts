import { ObjectProxyHandler } from "./ObjectProxyHandler";
import type { ProxiedValueV2 } from "../../classes/ProxiedValue";
import type { ObservableProxyHandler } from "../../types";
import { unproxify } from "../../utils/unproxify";
import { getHandler } from "./getHandler";
import { extendsObject } from "../../utils/extendsObject";
import { cloneCommonObject } from "../../utils/clone/cloneCommonObject";

export class CommonObjectProxyHandler<T extends object>
  extends ObjectProxyHandler<T>
  implements ObservableProxyHandler<ProxiedValueV2<T>, any>
{
  apply(target: ProxiedValueV2<T>, _: any, args: any[]) {
    if (args.length > 0) {
      const newValue = unproxify(args[0]);
      if (newValue && extendsObject(newValue)) {
        // Transaction
        target.$value = this.getInitialValue(target, newValue);
        for (const key in { ...target.$value, ...newValue }) {
          target.$value[key](newValue[key]);
        }
        const notifiableObservers = target.notifiableObservers;
        if (notifiableObservers) target.notifyCurrentValue(notifiableObservers);
        return;
      } else {
        const newHandler = getHandler(
          newValue,
          this.parentSubscription,
          this.rootObservableCallback,
        );
        target.handler = newHandler;
        return target.handler.apply(target, _, args);
      }
    }
    return target.valueOf();
  }
  getInitialValue(target: ProxiedValueV2<T>, unproxifiedValue: Set<any>): T {
    return cloneCommonObject(unproxifiedValue as object, (value) =>
      this.createProxyChild(target, value),
    ) as T;
  }
  set(target: ProxiedValueV2<T>, p: string | symbol, newValue: any): boolean {
    if (p in target.$value) return target.$value[p](newValue);
    else {
      target.$value[p] = this.createProxyChild(target, newValue);
      target.notifyCurrentValue?.();
      return true;
    }
  }
  get(target: ProxiedValueV2<T>, p: string | symbol) {
    if (p in target) return Reflect.get(target, p);
    if (p in target.$value) return Reflect.get(target.$value, p, target.$value);
    // Reflect doesnt work properly here
    else this.set(target, p, undefined);
  }
}
