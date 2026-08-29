import type {
  ObservableProxyPort,
  CallableReactiveValuePort,
  UseProxiedComputedObservePortOptions,
  UseComputedObservePortOptions,
} from "#ports";

export interface UseAsyncComputedObservePort {
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
