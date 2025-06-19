import { PrimitiveValue } from "../classes/PrimitiveValue";
import { ProxiedValue } from "../classes/ProxiedValue";
import type { UseObserve, UseObserveInternal } from "../types";
import { ObservableProxyHandler } from "./proxyHandlers/ObservableProxyHandler";

const observableProxyHandler = new ObservableProxyHandler();
export const useObserveInternal: UseObserveInternal = (
  item,
  parentSubscription,
  /**
   * For functions inside an observable
   */
  rootObservableCallback,
) =>
  new Proxy(
    new ProxiedValue<any>(item, parentSubscription, rootObservableCallback),
    observableProxyHandler,
  ) as any;

/**
 * Responsible for observing changes on different types of values.
 * @param item The value to be observed.
 * @returns A new observable
 */
export const useObserve: UseObserve = (item, usePrimitive) => {
  if (usePrimitive) return new PrimitiveValue(item) as any;
  const rootObservableCallback = () => result;
  const result = useObserveInternal(item, undefined, rootObservableCallback);
  return result;
};
