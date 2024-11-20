import { useObserveInternal } from "../useObserve";
import type { ObservableType, ParentSubscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import { createParentSubscription } from "./proxyHandlers/createParentSubscription";
import { cloneMap } from "../../utils/clone/cloneMap";
import { SetProxyHandler } from "./proxyHandlers/SetProxyHandler";

export const observeSet = <E, T extends Set<E>>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>,
): ObservableType<Set<E>> => {
  const newParentSubscription = createParentSubscription(() => newObservable);
  const proxiedSet = cloneMap(item, (value) =>
    useObserveInternal(value, newParentSubscription, rootObservableCallback),
  );
  // @ts-ignore
  const newObservable = new ProxiedValue(proxiedSet, parentSubscription);
  const proxy = new Proxy(
    newObservable,
    new SetProxyHandler(
      () => proxy,
      rootObservableCallback,
      newParentSubscription,
    ),
  );
  return proxy as unknown as ObservableType<Set<E>>;
};
