import type { ProxiedValue } from "../../classes/ProxiedValue";
import { unproxify } from "../../utils";
import { SharedProxyHandler } from "./SharedProxyHandler";

export abstract class ObjectProxyHandler<T extends object>
  extends SharedProxyHandler<T>
  implements ProxyHandler<ProxiedValue<T>>
{
  deleteProperty(target: ProxiedValue<T>, p: string | symbol) {
    if (p in target) return Reflect.deleteProperty(target, p);
    const deletedProperty = target.$value[p];
    if (deletedProperty) {
      const result = Reflect.deleteProperty(target.$value, p);
      target.notifyCurrentValue();
      return result;
    }
    return false;
  }

  ownKeys(target: ProxiedValue<T>) {
    return Reflect.ownKeys(target.$value);
  }

  getOwnPropertyDescriptor(target: ProxiedValue<T>, p: string | symbol) {
    return {
      ...Reflect.getOwnPropertyDescriptor(target, p),
      enumerable: true,
      configurable: true,
    };
  }

  has(target: ProxiedValue<T>, p: string | symbol) {
    return this.ownKeys(target).includes(p);
  }

  set(target: ProxiedValue<T>, p: string | symbol, newValue: any): boolean {
    return this.setNewValue(target, p, unproxify(newValue));
  }
  setNewValue(
    target: ProxiedValue<T>,
    p: string | symbol,
    unproxifiedValue: any,
  ): boolean {
    if (p in target.$value) {
      target.$value[p](unproxifiedValue);
      return true;
    }
    target.$value[p] = this.createProxyChild(target, unproxifiedValue);
    target.$value[p].notifyCurrentValue();
    return true;
  }
}
