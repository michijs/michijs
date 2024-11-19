import { useObserveInternal } from "../useObserve";
import type { ObservableType, ParentSubscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import { cloneCommonObject } from "../../utils/clone/cloneCommonObject";
import { createParentSubscription } from "./proxyHandlers/createParentSubscription";
import { ObjectProxyHandler } from "./proxyHandlers/ObjectProxyHandler";

export function observeCommonObject<T>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>,
  needsToBeCloned?: boolean,
): ObservableType<T> {
  const newParentSubscription = createParentSubscription(() => newObservable);
  const newObservable = new ProxiedValue(
    needsToBeCloned
      ? cloneCommonObject(item as object, (value) =>
          useObserveInternal<any>(
            value,
            newParentSubscription,
            rootObservableCallback,
          ),
        )
      : item,
    parentSubscription,
  );
  const proxy = new Proxy(newObservable, new ObjectProxyHandler(() => proxy, rootObservableCallback, newParentSubscription)) as unknown as ObservableType<T>;
  return proxy;
}
