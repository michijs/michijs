import { ProxiedValueV2 } from "../../classes/ProxiedValue";
import { SharedProxyHandler } from "./SharedProxyHandler";

export class ObjectProxyHandler<T extends object> extends SharedProxyHandler<T> implements ProxyHandler<ProxiedValueV2<T>> {
  deleteProperty(target: ProxiedValueV2<T>, p: string | symbol) {
    if (p in target) return Reflect.deleteProperty(target, p);
    const deletedProperty = target.$value[p];
    if (deletedProperty) {
      const result = Reflect.deleteProperty(target.$value, p);
      target.notifyCurrentValue();
      return result;
    }
    return false;
  }

  ownKeys(target: ProxiedValueV2<T>) {
    return Reflect.ownKeys(target.$value);
  }

  getOwnPropertyDescriptor(target: ProxiedValueV2<T>, p: string | symbol) {
    return {
      ...Reflect.getOwnPropertyDescriptor(target, p),
      enumerable: true,
      configurable: true,
    };
  }

  has(target: ProxiedValueV2<T>, p: string | symbol) {
    return this.ownKeys(target).includes(p);
  }

  set(target: ProxiedValueV2<T>, p: string | symbol, newValue: any): boolean {
    if (p in target.$value) {
      target.$value[p](newValue)
      return true;
    } else {
      target.$value[p] = this.createProxyChild(target, newValue)
      target.notifyCurrentValue?.();
      return true;
    }
  }
}
