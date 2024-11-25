import { ProxiedValueV2 } from "../classes/ProxiedValue";
import type { ObservableType, ParentSubscription } from "../types";
import { ObservableProxyHandler } from "./proxyHandlers/ObservableProxyHandler";

const observableProxyHandler = new ObservableProxyHandler();
export function useObserveInternal<T>(
  item?: T,
  parentSubscription?: ParentSubscription<T>,
  /**
   * For functions inside an observable
   */
  rootObservableCallback?: () => ObservableType<unknown>,
): ObservableType<T> {
  return new Proxy(
    new ProxiedValueV2<any>(item, parentSubscription, rootObservableCallback),
    observableProxyHandler,
  ) as unknown as ObservableType<T>;
}

/**
 * Responsible for observing changes on different types of values.
 * @param item The value to be observed.
 * @returns A new observable
 */
export function useObserve<T>(item?: T): ObservableType<T> {
  const rootObservableCallback = () => result;
  const result = useObserveInternal(item, undefined, rootObservableCallback);
  return result;
}
