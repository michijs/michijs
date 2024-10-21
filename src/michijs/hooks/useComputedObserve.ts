import { useObserveInternal } from "./useObserve";
import type {
  ObservableType,
  UseComputedObserveOptions,
  useWatchDeps,
} from "../types";
import { useWatch } from "./useWatch";

interface UseComputedObserve {
  <T>(
    callback: () => T,
    deps?: useWatchDeps,
    options?: UseComputedObserveOptions,
  ): ObservableType<T>;
}

/**
 * It is used for computing a value and observing its changes.
 * @param callback A function that returns a value of type T.
 * @param deps Dependencies to watch for changes.
 * @param options An optional object that may contain onBeforeUpdate and onAfterUpdate callback functions.
 * @returns A new observable
 */
export const useComputedObserve: UseComputedObserve = (
  callback,
  deps,
  options,
) => {
  const newObservable = useObserveInternal(callback());

  const listener = () => {
    try {
      const callbackResult = callback();
      options?.onBeforeUpdate?.();
      (newObservable as ObservableType<object>)(callbackResult as object);
      options?.onAfterUpdate?.();
    } catch (ex) {
      console.error(ex);
    }
  };
  useWatch(listener, deps);

  return newObservable;
};
