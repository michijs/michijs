import type {
  CallableReactiveValuePort,
  ObservableProxyPort,
  UseWatchDepsPort,
} from "#ports";

export interface UseComputedObservePortSharedOptions {
  onBeforeUpdate?(): void;
  onAfterUpdate?(): void;
  /**
   * Dependencies to watch for changes. When omitted, dependencies are automatically
   * detected by tracking observable reads during callback execution.
   */
  deps?: UseWatchDepsPort;
}
export interface UseProxiedComputedObservePortOptions
  extends UseComputedObservePortSharedOptions {
  useProxied: true;
}
export interface UseComputedObservePortOptions
  extends UseComputedObservePortSharedOptions {
  useProxied?: false;
}
export interface UseComputedObservePort {
  <T>(
    callback: () => T,
    options?: UseComputedObservePortOptions,
  ): CallableReactiveValuePort<T>;
  <T>(
    callback: () => T,
    options: UseProxiedComputedObservePortOptions,
  ): ObservableProxyPort<T>;
}
