import type { ObservableType, ParentSubscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import { cloneDate } from "../../utils/clone/cloneDate";
import { DateProxyHandler } from "./proxyHandlers/DateProxyHandler";

export function observeDate<T extends Date>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>,
) {
  const clone = cloneDate(item);
  const newObservable = new ProxiedValue<T>(clone, parentSubscription);
  const proxy = new Proxy(
    newObservable,
    new DateProxyHandler(
      () => proxy,
      rootObservableCallback,
      parentSubscription,
    ),
  ) as unknown as ObservableType<T>;
  return proxy;
}
