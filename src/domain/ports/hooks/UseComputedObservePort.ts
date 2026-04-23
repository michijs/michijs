import type {
  CallableReactiveValuePort,
  ObservableProxyPort,
  UseWatchDepsPort,
} from "@ports";

export interface UseComputedObservePortSharedOptions {
  onBeforeUpdate?(): void;
  onAfterUpdate?(): void;
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
  // With explicit deps
  <T>(
    callback: () => T,
    deps: UseWatchDepsPort,
    options: UseComputedObservePortOptions,
  ): CallableReactiveValuePort<T>;
  <T>(
    callback: () => T,
    deps: UseWatchDepsPort,
    options?: UseProxiedComputedObservePortOptions,
  ): ObservableProxyPort<T>;
  // Auto-tracking (no deps)
  <T>(
    callback: () => T,
    options: UseComputedObservePortOptions,
  ): CallableReactiveValuePort<T>;
  <T>(
    callback: () => T,
    options?: UseProxiedComputedObservePortOptions,
  ): ObservableProxyPort<T>;
}
