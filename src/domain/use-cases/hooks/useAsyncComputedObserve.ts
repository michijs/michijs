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
        // A newer invocation superseded this one: its error is irrelevant
        if (currentAbortController.signal.aborted) return;
        currentAbortController.abort();
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

    // Track only synchronous reads. The tracking frame must be closed before
    // awaiting, otherwise unrelated reads made while the promise is pending
    // would be recorded as dependencies.
    startTracking();
    let promise: Promise<any>;
    try {
      promise = callback(currentAbortController.signal);
    } finally {
      for (const dep of stopTracking()) dep.subscribe(listener);
    }

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
      // A newer invocation superseded this one: its error is irrelevant
      if (currentAbortController.signal.aborted) return;
      currentAbortController.abort();
      throw ex;
    }
  };
  listener();

  return newObservable;
}) as any;
