import { ProxiedValueV2 } from "../../classes/ProxiedValue";

export class ObservableProxyHandler<T> implements ProxyHandler<ProxiedValueV2<T>> {
  set(target: ProxiedValueV2<T>, property, newValue, receiver) {
    return target.handler.set?.(target, property, newValue, receiver) ?? Reflect.set(target, property, newValue, receiver);
  }

  deleteProperty(target: ProxiedValueV2<T>, property) {
    return target.handler.deleteProperty?.(target, property) ?? Reflect.deleteProperty(target, property);
  }

  apply(target: ProxiedValueV2<T>, _, args) {
    return target.handler.apply?.(target, _, args) ?? Reflect.apply(target, _, args);
  }

  ownKeys(target) {
    return target.handler.ownKeys?.(target) ?? Reflect.ownKeys(target);
  }

  getOwnPropertyDescriptor(target: ProxiedValueV2<T>, property) {
    return target.handler.getOwnPropertyDescriptor?.(target, property) ?? Reflect.getOwnPropertyDescriptor(target, property);
  }

  has(target: ProxiedValueV2<T>, property) {
    return target.handler.has?.(target, property) ?? Reflect.has(target, property);
  }

  get(target: ProxiedValueV2<T>, p, receiver) {
    return target.handler.get?.(target, p, receiver) ?? Reflect.get(target, p, receiver);
  }
}
