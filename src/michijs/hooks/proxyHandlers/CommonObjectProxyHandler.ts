import { ObjectProxyHandler } from "./ObjectProxyHandler";
import { ProxiedValue } from "../../classes/ProxiedValue";
import type { ObservableProxyHandler } from "../../types";
import { unproxify } from "../../utils/unproxify";
import { extendsObject } from "../../utils/extendsObject";
import { cloneCommonObject } from "../../utils/clone/cloneCommonObject";

export class CommonObjectProxyHandler<T extends object>
  extends ObjectProxyHandler<T>
  implements ObservableProxyHandler<ProxiedValue<T>, any>
{
  apply(target: ProxiedValue<T>, _: any, args: any[]) {
    if (args.length > 0) {
      const unproxifiedValue = unproxify(args[0]);
      if (unproxifiedValue && extendsObject(unproxifiedValue))
        return this.applyNewValue(target, unproxifiedValue);
      else return this.updateHandlerAndValue(target, unproxifiedValue);
    }
    return target.valueOf();
  }
  applyNewValue(target: ProxiedValue<T>, unproxifiedValue: any) {
    ProxiedValue.startTransaction();
    for (const key in { ...target.$value, ...unproxifiedValue }) {
      this.set(target, key, unproxifiedValue[key]);
    }
    ProxiedValue.endTransaction();
  }
  getInitialValue(target: ProxiedValue<T>, unproxifiedValue: any): T {
    return cloneCommonObject(unproxifiedValue as object, (value) =>
      this.createProxyChild(target, value),
    ) as T;
  }
  get(target: ProxiedValue<T>, p: string | symbol) {
    if (p in target) return Reflect.get(target, p);
    if (!(p in target.$value)) this.set(target, p, undefined);
    return Reflect.get(target.$value, p, target.$value);
  }
}
