import { useObserve } from ".";
import type {
  ObservableType,
  UseComputedObserveOptions,
  useWatchDeps,
} from "../types";
import { useWatch } from "./useWatch";

interface UseAsyncComputedObserve {
  <T>(
    callback: () => Promise<T>,
    initialValue?: T,
    deps?: useWatchDeps,
    options?: UseComputedObserveOptions): ObservableType<T>
};

/**
 * It is used for computing a value and observing its changes.
 * @param callback A function that returns a promise of type T.
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
  const newObservable = useObserve(initialValue);

  const listener = async () => {
    const callbackResult = await callback();
    options?.onBeforeUpdate?.();
    (newObservable as ObservableType<object>)(callbackResult as object);
    options?.onAfterUpdate?.();
  };
  useWatch(listener, deps);

  return newObservable;
};
