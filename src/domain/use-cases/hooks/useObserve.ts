import { ReactiveValue } from "../../entities/reactive/core/ReactiveValue";
import { ProxiedValue } from "../../entities/reactive/proxied/ProxiedValue";
import type { UseObservePort, UseObserveInternal } from "@ports";
import { ObservableProxyHandler } from "../proxyHandlers/ObservableProxyHandler";
import { getHandler } from "../proxyHandlers/getHandler";

export const useObserveInternal: UseObserveInternal = (
  item,
  parentSubscription,
  /**
   * For functions inside an observable
   */
  rootObservableCallback,
) =>
  new Proxy(
    new ProxiedValue<any>(
      item,
      parentSubscription,
      getHandler(item, parentSubscription, rootObservableCallback),
    ),
    new ObservableProxyHandler(),
  ) as any;

/**
 * Responsible for observing changes on different types of values.
 * @param item The value to be observed.
 * @param useProxied When `true`, returns a deep-proxy observable (`ObservableProxyPort<T>`) that intercepts
 *   property access and mutations on complex objects. When `false` or omitted (default), returns a
 *   lightweight `CallableReactiveValuePort<T>` (similar to TC39 signals).
 * @returns A new observable
 */
export const useObserve: UseObservePort = (item, useProxied) => {
  if (useProxied) {
    const rootObservableCallback = () => result;
    const result = useObserveInternal(item, undefined, rootObservableCallback);
    return result;
  }
  return new ReactiveValue(item) as any;
};
