import type { ObservableType } from "../types";
import { useObserve } from "./useObserve";
import { setObservableValue } from "../utils";
import { useWatch, type useWatchDeps } from "./useWatch";

/**
 * It is used for synchronously computing a value and observing its changes.
 * @param callback A function that returns a promise of type T.
 * @param deps Dependencies to watch for changes.
 * @param options An optional object that may contain onBeforeUpdate and onAfterUpdate callback functions.
 * @returns A new observable
 */
export function useComputedObserve<const T>(
  callback: () => T,
  deps: useWatchDeps,
  options?: {
    onBeforeUpdate?(): void;
    onAfterUpdate?(): void;
  },
): ObservableType<T> {
  const newObservable = useObserve(callback());

  const listener = () => {
    options?.onBeforeUpdate?.();
    setObservableValue(newObservable, callback());
    options?.onAfterUpdate?.();
  };

  useWatch(listener, deps);

  return newObservable;
}
