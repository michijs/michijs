import type {
  ObservableProxyPort,
  CallableReactiveValuePort,
  ParentSubscription,
} from "@ports";

export interface UseObserveInternal {
  <T>(
    item?: T,
    parentSubscription?: ParentSubscription<T>,
    /**
     * For functions inside an observable
     */
    rootObservableCallback?: () => ObservableProxyPort<unknown>,
  ): ObservableProxyPort<T>;
}

/**
 * Creates an observable for the given value.
 *
 * - When `useProxied` is `true`, returns a deep-proxy observable (`ObservableProxyPort<T>`)
 *   that intercepts property access and mutations on complex objects (arrays, maps, sets, dates, etc.).
 * - When `useProxied` is `false` or omitted (default), returns a lightweight
 *   `CallableReactiveValuePort<T>` (similar to TC39 signals) that can be called to update its value.
 */
export interface UseObservePort {
  /** @param useProxied Opt into deep-proxy observable. */
  <T>(item: T, useProxied: true): ObservableProxyPort<T>;
  /** @param useProxied When omitted or `false`, returns a lightweight reactive value. */
  <T>(item: T, useProxied?: false): CallableReactiveValuePort<T>;
}
