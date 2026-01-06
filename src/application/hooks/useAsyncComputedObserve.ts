import { useObserve } from "./useObserve";
import type {
  UseAsyncComputedObserve,
  ObservableType,
} from "../../shared/types/types";
import { useWatch } from "./useWatch";

/**
 * It is used for async computing a value and observing its changes.
 * @param callback A function that returns a promise of type T.
 * @param initialValue Initial value of type T.
 * @param deps Dependencies to watch for changes.
 * @param options An optional object that may contain onBeforeUpdate and onAfterUpdate callback functions.
 * @returns A new observable
 */
export const useAsyncComputedObserve: UseAsyncComputedObserve = (
  callback,
  initialValue,
  deps,
  options,
) => {
  const newObservable = useObserve(initialValue, options?.usePrimitive);
  let abortController: AbortController | undefined;

  const listener = async () => {
    abortController?.abort();
    abortController = new AbortController();
    const currentAbortController = abortController;
    try {
      // Should cancel any update before the last call
      const callbackResult = await callback(currentAbortController.signal);
      if (!currentAbortController.signal.aborted) {
        options?.onBeforeUpdate?.();
        (newObservable as ObservableType<object>)(callbackResult as object);
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
};
