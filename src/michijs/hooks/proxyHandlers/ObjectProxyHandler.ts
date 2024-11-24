import type { ProxiedValueV2 } from "../../classes/ProxiedValue";
import { SharedProxyHandler } from "./SharedProxyHandler";

export class ObjectProxyHandler<T>
  extends SharedProxyHandler<T>
  implements ProxyHandler<ProxiedValueV2<T>>
{
  deleteProperty(target, property) {
    if (property in target) return Reflect.deleteProperty(target, property);
    const deletedProperty = target.$value[property];
    if (deletedProperty) {
      Reflect.set(deletedProperty, "$value", undefined);
      // const result = Reflect.deleteProperty(target.$value, property);
      // deletedProperty.$value = undefined;

      return true;
    }
    return false;
  }

  ownKeys(target) {
    return Reflect.ownKeys(target.$value as object);
  }

  getOwnPropertyDescriptor(target, prop) {
    return {
      ...Reflect.getOwnPropertyDescriptor(target, prop),
      enumerable: true,
      configurable: true,
    };
  }

  has(target, property) {
    return this.ownKeys(target).includes(property);
  }
}
