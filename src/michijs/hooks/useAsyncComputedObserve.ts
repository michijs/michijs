import { useObserve } from ".";
import { setObservableValue } from "../utils";
import { useWatch, type useWatchDeps } from "./useWatch";

/**
 * It is used for asynchronously computing a value and observing its changes.
 * @param callback A function that returns a promise of type T.
 * @param deps Dependencies to watch for changes.
 * @param initialValue Initial value of type T.
 * @returns A new observable
 */
export function useAsyncComputedObserve<T>(
  callback: () => Promise<T>,
  deps: useWatchDeps,
  initialValue: T,
) {
  const newObservable = useObserve(initialValue);

  const listener = () => {
    callback().then((result) => {
      setObservableValue(newObservable, result);
    });
  };
  listener();

  useWatch(listener, deps);

  return newObservable;
}
