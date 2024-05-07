import { useObserve } from ".";
import type { ObservableType } from "../types";
import { useWatch, useWatchDeps } from "./useWatch";

/**
 * It is used for computing a value and observing its changes.
 * @param callback A function that returns a promise of type T.
 * @param deps Dependencies to watch for changes.
 * @param initialValue Initial value of type T. Useful if the callback is a promise
 * @param options An optional object that may contain onBeforeUpdate and onAfterUpdate callback functions.
 * @returns A new observable
 */
export function useComputedObserve<T, Y extends T>(
  callback: () => Promise<T> | T,
  deps?: useWatchDeps,
  initialValue?: Y,
  options?: {
    onBeforeUpdate?(): void;
    onAfterUpdate?(): void;
  },
): ObservableType<
typeof callback extends Promise<T> ? T : (T extends object
  ? Required<Pick<T, Y extends T ? keyof Y : keyof T>> &
  Omit<T, Y extends T ? keyof Y : keyof T>
  : Y)
> {
  const newObservable = useObserve(
    initialValue as typeof callback extends Promise<T> ? T : (T extends object
      ? Required<Pick<T, Y extends T ? keyof Y : keyof T>> &
      Omit<T, Y extends T ? keyof Y : keyof T>
      : Y)
  );

  const listener = () => {
    options?.onBeforeUpdate?.();
    const callbackResult = callback();
    callbackResult instanceof Promise ? callbackResult.then(x => (newObservable as ObservableType<object>)(x as object)): (newObservable as ObservableType<object>)(callbackResult as object)
    options?.onAfterUpdate?.();
  };
  listener();
  useWatch(listener, deps);

  return newObservable;
}
