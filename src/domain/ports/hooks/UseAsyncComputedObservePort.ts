import type {
  ObservableProxyPort,
  CallableReactiveValuePort,
  UseProxiedComputedObservePortOptions,
  UseComputedObservePortOptions,
  UseWatchDepsPort,
} from "#ports";

export interface UseAsyncComputedObservePort {
  // With explicit deps
  <T>(
    callback: (abortSignal: AbortSignal) => Promise<T>,
    initialValue: T,
    deps: UseWatchDepsPort,
    options?: UseComputedObservePortOptions,
  ): CallableReactiveValuePort<T>;
  <T>(
    callback: (abortSignal: AbortSignal) => Promise<T>,
    initialValue: T,
    deps: UseWatchDepsPort,
    options: UseProxiedComputedObservePortOptions,
  ): ObservableProxyPort<T>;
  // Auto-tracking (no deps)
  <T>(
    callback: (abortSignal: AbortSignal) => Promise<T>,
    initialValue: T,
    options?: UseComputedObservePortOptions,
  ): CallableReactiveValuePort<T>;
  <T>(
    callback: (abortSignal: AbortSignal) => Promise<T>,
    initialValue: T,
    options: UseProxiedComputedObservePortOptions,
  ): ObservableProxyPort<T>;
}
