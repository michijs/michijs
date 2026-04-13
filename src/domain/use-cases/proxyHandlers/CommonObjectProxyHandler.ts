import { ObjectProxyHandler } from "./ObjectProxyHandler";
import type { ProxiedValuePort, ProxyHandlerPort } from "@ports";
import { extendsObject, cloneCommonObject } from "@shared";
import { unproxify } from "../../utils/unproxify";

export class CommonObjectProxyHandler<T extends object>
  extends ObjectProxyHandler<T>
  implements ProxyHandlerPort<T>
{
  apply(target: ProxiedValuePort<T>, _: any, args: any[]) {
    if (args.length > 0) {
      const unproxifiedValue = unproxify(args[0]);
      if (unproxifiedValue && extendsObject(unproxifiedValue))
        return this.applyNewValue(target, unproxifiedValue);
      return this.updateHandlerAndValue(target, unproxifiedValue);
    }
    return target.valueOf();
  }
  applyNewValue(target: ProxiedValuePort<T>, unproxifiedValue: any) {
    target.startTransaction();
    for (const key in { ...target.$value, ...unproxifiedValue })
      this.setNewValue(target, key, unproxifiedValue[key]);
    target.endTransaction();
  }
  getInitialValue(target: ProxiedValuePort<T>, unproxifiedValue: any): T {
    return cloneCommonObject(unproxifiedValue as object, (value) =>
      this.createProxyChild(target, value),
    ) as T;
  }
  get(target: ProxiedValuePort<T>, p: string | symbol) {
    if (p in target) return Reflect.get(target, p);
    if (!(p in target.$value)) this.setNewValue(target, p, undefined);
    return Reflect.get(target.$value, p, target.$value);
  }
}
