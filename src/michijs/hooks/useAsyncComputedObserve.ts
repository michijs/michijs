import { useObserve } from ".";
import type { ObservableType } from "../types";
import { useWatch, type useWatchDeps } from "./useWatch";

/**
 * It is used for asynchronously computing a value and observing its changes.
 * @param callback A function that returns a promise of type T.
 * @param deps Dependencies to watch for changes.
 * @param initialValue Initial value of type T.
 * @returns A new observable
 */
export function useAsyncComputedObserve<T, Y extends T>(
  callback: () => Promise<T>,
  deps: useWatchDeps,
  initialValue: Y,
): ObservableType<
  T extends object
    ? Required<Pick<T, Y extends T ? keyof Y : keyof T>> &
        Omit<T, Y extends T ? keyof Y : keyof T>
    : Y
> {
  const newObservable = useObserve(
    initialValue as T extends object
      ? Required<Pick<T, Y extends T ? keyof Y : keyof T>> &
          Omit<T, Y extends T ? keyof Y : keyof T>
      : Y,
  );

  const listener = () => {
    callback().then((result) => {
      (newObservable as ObservableType<object>)(result as object);
    });
  };
  listener();

  useWatch(listener, deps);

  return newObservable;
}
