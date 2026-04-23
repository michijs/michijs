import type {
  UseComputedObservePort,
  CallableReactiveValuePort,
  ObservablePort,
} from "@ports";
import { useObserve } from "./useObserve";
import { useWatch } from "./useWatch";
import { startTracking, stopTracking } from "../../utils/dependencyTracker";

/**
 * It is used for computing a value and observing its changes.
 * @param callback A function that returns a value of type T.
 * @param depsOrOptions Dependencies to watch for changes, or options object. When omitted,
 *   dependencies are automatically detected by tracking observable reads during callback execution.
 * @param maybeOptions An optional object that may contain `onBeforeUpdate`, `onAfterUpdate` callbacks and `useProxied`.
 *   When `options.useProxied` is `true`, the returned observable is a deep-proxy (`ObservableProxyPort<T>`).
 *   When `false` or omitted (default), returns a lightweight `CallableReactiveValuePort<T>`.
 * @returns A new observable
 */
export const useComputedObserve: UseComputedObservePort = ((
  callback: () => any,
  depsOrOptions?: any,
  maybeOptions?: any,
) => {
  const deps = Array.isArray(depsOrOptions) ? depsOrOptions : undefined;
  const options = deps ? maybeOptions : depsOrOptions;

  if (deps) {
    // Explicit deps — use the original behavior
    const newObservable = useObserve(callback(), options?.useProxied);

    const listener = () => {
      try {
        const callbackResult = callback();
        options?.onBeforeUpdate?.();
        (newObservable as CallableReactiveValuePort<object>)(
          callbackResult as object,
        );
        options?.onAfterUpdate?.();
      } catch (ex) {
        throw ex;
      }
    };
    useWatch(listener, deps);

    return newObservable;
  }

  // Auto-tracking — detect deps by tracking observable reads
  let trackedDeps = new Set<ObservablePort<any>>();

  startTracking();
  const initialValue = callback();
  trackedDeps = stopTracking();
  const newObservable = useObserve(initialValue, options?.useProxied);

  const listener = () => {
    // Re-track
    startTracking();
    let callbackResult: any;
    try {
      callbackResult = callback();
    } finally {
      const newDeps = stopTracking();

      for (const dep of newDeps)
        dep.subscribe(listener);

      trackedDeps = newDeps;
    }

    options?.onBeforeUpdate?.();
    (newObservable as CallableReactiveValuePort<object>)(
      callbackResult as object,
    );
    options?.onAfterUpdate?.();
  };

  // Initial subscriptions
  for (const dep of trackedDeps) dep.subscribe(listener);

  return newObservable;
}) as any;
