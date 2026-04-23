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
}
