import type { UseComputedObservePort, CallableReactiveValuePort } from "#ports";
import { useObserve } from "./useObserve";
import { useWatch } from "./useWatch";
import { startTracking, stopTracking } from "../../utils/dependencyTracker";

/**
 * It is used for computing a value and observing its changes.
 * @param callback A function that returns a value of type T.
 * @param options An optional object that may contain `deps`, `onBeforeUpdate`, `onAfterUpdate` callbacks and `useProxied`.
 *   When `options.deps` is provided, only those dependencies are watched. Otherwise dependencies
 *   are automatically detected by tracking observable reads during callback execution.
 *   When `options.useProxied` is `true`, the returned observable is a deep-proxy (`ObservableProxyPort<T>`).
 *   When `false` or omitted (default), returns a lightweight `CallableReactiveValuePort<T>`.
 * @returns A new observable
 */
export const useComputedObserve: UseComputedObservePort = ((
  callback: () => any,
  options?: any,
) => {
  const deps = options?.deps;

  if (deps) {
    // Explicit deps — use the original behavior
    const newObservable = useObserve(callback(), options?.useProxied);

    const listener = () => {
      const callbackResult = callback();
      options?.onBeforeUpdate?.();
      (newObservable as CallableReactiveValuePort<object>)(
        callbackResult as object,
      );
      options?.onAfterUpdate?.();
    };
    useWatch(listener, deps);

    return newObservable;
  }

  startTracking();
  const initialValue = callback();
  const trackedDeps = stopTracking();
  const newObservable = useObserve(initialValue, options?.useProxied);

  const listener = () => {
    // Re-track
    startTracking();
    let callbackResult: any;
    try {
      callbackResult = callback();
    } finally {
      const newDeps = stopTracking();

      for (const dep of newDeps) dep.subscribe(listener);
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
