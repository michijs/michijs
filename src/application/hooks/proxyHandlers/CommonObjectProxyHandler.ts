import { ObjectProxyHandler } from "./ObjectProxyHandler";
import { ProxiedValue } from "../../../domain/reactive/ProxiedValue";
import type { ObservableProxyHandlerInterface } from "../../../shared/types/types";
import { unproxify } from "../../../shared/utils/unproxify";
import { extendsObject } from "../../../shared/utils/extendsObject";
import { cloneCommonObject } from "../../../shared/utils/clone/cloneCommonObject";

export class CommonObjectProxyHandler<T extends object>
  extends ObjectProxyHandler<T>
  implements ObservableProxyHandlerInterface<T>
{
  apply(target: ProxiedValue<T>, _: any, args: any[]) {
    if (args.length > 0) {
      const unproxifiedValue = unproxify(args[0]);
      if (unproxifiedValue && extendsObject(unproxifiedValue))
        return this.applyNewValue(target, unproxifiedValue);
      return this.updateHandlerAndValue(target, unproxifiedValue);
    }
    return target.valueOf();
  }
  applyNewValue(target: ProxiedValue<T>, unproxifiedValue: any) {
    target.startTransaction();
    for (const key in { ...target.$value, ...unproxifiedValue })
      this.setNewValue(target, key, unproxifiedValue[key]);
    target.endTransaction();
  }
  getInitialValue(target: ProxiedValue<T>, unproxifiedValue: any): T {
    return cloneCommonObject(unproxifiedValue as object, (value) =>
      this.createProxyChild(target, value),
    ) as T;
  }
  get(target: ProxiedValue<T>, p: string | symbol) {
    if (p in target) return Reflect.get(target, p);
    if (!(p in target.$value)) this.setNewValue(target, p, undefined);
    return Reflect.get(target.$value, p, target.$value);
  }
}
