import { useObserveInternal } from "../useObserve";
import type { ObservableType, ParentSubscription } from "../../types";
import { createParentSubscription } from "./proxyHandlers/createParentSubscription";
import { cloneArray } from "../../utils/clone/cloneArray";
import { ProxiedArray } from "../../classes/ProxiedValue";
import { ArrayProxyHandler } from "./proxyHandlers/ArrayProxyHandler";

export function observeArray<T extends Array<unknown>>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>,
) {
  const newParentSubscription = createParentSubscription(() => newObservable);
  const proxiedArray = cloneArray(item, (value) =>
    useObserveInternal<any>(
      value,
      newParentSubscription,
      rootObservableCallback,
    ),
  );

  const newObservable = new ProxiedArray<T>(proxiedArray, parentSubscription);
  const proxy = new Proxy(
    newObservable,
    new ArrayProxyHandler(
      () => proxy,
      rootObservableCallback,
      newParentSubscription,
    ),
  );

  return proxy as unknown as ObservableType<T>;
}
