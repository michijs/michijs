import type { CallableProxiedValuePort, CallableReactiveValuePort, UseProxiedComputedObservePortOptions, UseComputedObservePortOptions, UseWatchDepsPort } from "@ports";

export interface UseAsyncComputedObservePort {
  <T>(
    callback: (abortSignal: AbortSignal) => Promise<T>,
    initialValue: T,
    deps: UseWatchDepsPort,
    options?: UseProxiedComputedObservePortOptions
  ): CallableProxiedValuePort<T>;
  <T>(
    callback: (abortSignal: AbortSignal) => Promise<T>,
    initialValue: T,
    deps: UseWatchDepsPort,
    options?: UseComputedObservePortOptions
  ): CallableReactiveValuePort<T>;
}
