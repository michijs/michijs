import type { ProxiedValue } from "../../classes/ProxiedValue";

export class ObservableProxyHandler<T>
  implements ProxyHandler<ProxiedValue<T>>
{
  callIfExists(name: keyof ProxyHandler<ProxiedValue<T>>, ...args: unknown[]) {
    const target = args[0] as ProxiedValue<T>;
    // @ts-ignore
    return target.handler[name]
      ? target.handler[name](...args)
      : Reflect[name](...args);
  }
  set(target: ProxiedValue<T>, property, newValue, receiver) {
    return (
      target.handler.set?.(target, property, newValue, receiver) ??
      Reflect.set(target, property, newValue, receiver)
    );
  }

  deleteProperty(...args: unknown[]) {
    return this.callIfExists("deleteProperty", ...args);
  }

  apply(...args: unknown[]) {
    return this.callIfExists("apply", ...args);
  }

  ownKeys(...args: unknown[]) {
    return this.callIfExists("ownKeys", ...args);
  }

  getOwnPropertyDescriptor(...args: unknown[]) {
    return this.callIfExists("getOwnPropertyDescriptor", ...args);
  }

  has(...args: unknown[]) {
    return this.callIfExists("has", ...args);
  }

  get(...args: unknown[]) {
    return this.callIfExists("get", ...args);
  }
}
