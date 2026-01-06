import { ProxiedValue } from "../../domain/reactive/ProxiedValue";
import { PrimitiveValue } from "../../domain/reactive/PrimitiveValue";
import type { UseObserveInternal, UseObserve } from "../../shared/types/types";
import { ObservableProxyHandler } from "./proxyHandlers/ObservableProxyHandler";

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
    new ObservableProxyHandler(),
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
