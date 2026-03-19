import type { ObservableProxyPort, CallableReactiveValuePort, ParentSubscription } from "@ports";

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

export interface UseObservePort {
  <T>(item: T, useProxied: true): ObservableProxyPort<T>;
  <T>(item: T, useProxied?: false): CallableReactiveValuePort<T>;
}

