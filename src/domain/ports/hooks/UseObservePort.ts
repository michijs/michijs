import type { CallableProxiedValuePort, CallableReactiveValuePort, ParentSubscription } from "@ports";

export interface UseObserveInternal {
  <T>(
    item?: T,
    parentSubscription?: ParentSubscription<T>,
    /**
     * For functions inside an observable
     */
    rootObservableCallback?: () => CallableReactiveValuePort<unknown>,
  ): CallableReactiveValuePort<T>;
}

export interface UseObservePort {
  <T>(item: T, useProxied: true): CallableProxiedValuePort<T>;
  <T>(item: T, useProxied?: false): CallableReactiveValuePort<T>;
}

