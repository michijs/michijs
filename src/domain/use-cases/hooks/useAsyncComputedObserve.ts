import { useObserve } from "./useObserve";
import type {
  UseAsyncComputedObservePort,
  CallableReactiveValuePort,
} from "#ports";
import { useWatch } from "./useWatch";
import { startTracking, stopTracking } from "../../utils/dependencyTracker";

/**
 * It is used for async computing a value and observing its changes.
 * @param callback A function that returns a promise of type T. Receives an `AbortSignal` that is
 *   aborted if a newer invocation starts before the current one resolves.
 * @param initialValue Initial value of type T.
 * @param options An optional object that may contain `deps`, `onBeforeUpdate`, `onAfterUpdate` callbacks and `useProxied`.
 *   When `options.deps` is provided, only those dependencies are watched. Otherwise dependencies
 *   are automatically detected by tracking synchronous observable reads during callback execution.
 *   When `options.useProxied` is `true`, the returned observable is a deep-proxy (`ObservableProxyPort<T>`).
 *   When `false` or omitted (default), returns a lightweight `CallableReactiveValuePort<T>`.
 * @returns A new observable
 */
export const useAsyncComputedObserve: UseAsyncComputedObservePort = ((
  callback: (abortSignal: AbortSignal) => Promise<any>,
  initialValue: any,
  options?: any,
) => {
  const deps = options?.deps;

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
      const newDeps = stopTracking();

      for (const dep of newDeps) dep.subscribe(listener);
    }
  };
  listener();

  return newObservable;
}) as any;
