import type { ProxiedValue } from "../../../domain/entities/ProxiedValue";
import type { ObservableProxyHandlerInterface } from "../../types";

export class ObservableProxyHandler<T>
  implements ObservableProxyHandlerInterface<T>
{
  callIfExists(name: keyof ProxyHandler<ProxiedValue<T>>, ...args: unknown[]) {
    const target = args[0] as ProxiedValue<T>;
    return target.handler[name]
      ? // @ts-ignore
        target.handler[name](...args)
      : // @ts-ignore
        Reflect[name](...args);
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
