import { useObserve } from "./useObserve";
import type {
  UseAsyncComputedObservePort,
  CallableReactiveValuePort,
  ObservablePort,
} from "@ports";
import { useWatch } from "./useWatch";
import { startTracking, stopTracking } from "../../utils/dependencyTracker";

/**
 * It is used for async computing a value and observing its changes.
 * @param callback A function that returns a promise of type T. Receives an `AbortSignal` that is
 *   aborted if a newer invocation starts before the current one resolves.
 * @param initialValue Initial value of type T.
 * @param depsOrOptions Dependencies to watch for changes, or options object. When omitted,
 *   dependencies are automatically detected by tracking synchronous observable reads during callback execution.
 * @param maybeOptions An optional object that may contain `onBeforeUpdate`, `onAfterUpdate` callbacks and `useProxied`.
 *   When `options.useProxied` is `true`, the returned observable is a deep-proxy (`ObservableProxyPort<T>`).
 *   When `false` or omitted (default), returns a lightweight `CallableReactiveValuePort<T>`.
 * @returns A new observable
 */
export const useAsyncComputedObserve: UseAsyncComputedObservePort = ((
  callback: (abortSignal: AbortSignal) => Promise<any>,
  initialValue: any,
  depsOrOptions?: any,
  maybeOptions?: any,
) => {
  const deps = Array.isArray(depsOrOptions) ? depsOrOptions : undefined;
  const options = deps ? maybeOptions : depsOrOptions;

  if (deps) {
    // Explicit deps — use the original behavior
    const newObservable = useObserve(initialValue, options?.useProxied);
    let abortController: AbortController | undefined;

    const listener = async () => {
      abortController?.abort();
      abortController = new AbortController();
      const currentAbortController = abortController;
      try {
        const callbackResult = await callback(currentAbortController.signal);
        if (!currentAbortController.signal.aborted) {
          options?.onBeforeUpdate?.();
          (newObservable as CallableReactiveValuePort<object>)(
            callbackResult as object,
          );
          options?.onAfterUpdate?.();
        }
      } catch (ex) {
        currentAbortController?.abort();
        throw ex;
      }
    };
    listener();
    useWatch(listener, deps);

    return newObservable;
  }

  // Auto-tracking — detect deps by tracking synchronous observable reads
  const newObservable = useObserve(initialValue, options?.useProxied);
  let abortController: AbortController | undefined;
  let trackedDeps = new Set<ObservablePort<any>>();

  const listener = async () => {
    abortController?.abort();
    abortController = new AbortController();
    const currentAbortController = abortController;

    // Track synchronous reads during callback invocation
    startTracking();
    const promise = callback(currentAbortController.signal);

    try {
      const callbackResult = await promise;
      if (!currentAbortController.signal.aborted) {
        options?.onBeforeUpdate?.();
        (newObservable as CallableReactiveValuePort<object>)(
          callbackResult as object,
        );
        options?.onAfterUpdate?.();
      }
    } catch (ex) {
      currentAbortController?.abort();
      throw ex;
    } finally {
      trackedDeps = stopTracking();
      // Subscribe to new deps
      for (const dep of trackedDeps) dep.subscribe(listener);
    }
  };
  listener();

  return newObservable;
}) as any;
