import { useObserveInternal } from "../useObserve";
import type { ObservableType, ParentSubscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import { createParentSubscription } from "./proxyHandlers/createParentSubscription";
import { cloneMap } from "../../utils/clone/cloneMap";
import { MapProxyHandler } from './proxyHandlers/MapProxyHandler'

export const observeMap = <E, T extends Map<any, E>>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>,
) => {
  const newParentSubscription = createParentSubscription(() => newObservable);
  const proxiedMap = cloneMap(item, (value) =>
    useObserveInternal(value, newParentSubscription, rootObservableCallback),
  );
  const newObservable = new ProxiedValue<T>(
    proxiedMap as T,
    parentSubscription,
  );
  const proxy = new Proxy(newObservable, new MapProxyHandler(() => proxy, rootObservableCallback, newParentSubscription)) as unknown as ObservableType<T>;
  return proxy;
};
