import { useObserve } from ".";
import { ObservableType } from "../types";
import { setObservableValue } from "../utils";

/**
 * It is used for asynchronously computing a value and observing its changes without dependencies.
 * @param callback A function that returns a promise of type T.
 * @param initialValue Initial value of type T.
 * @returns A new observable
 */
export function useAsyncObserve<T, Y extends T>(
  callback: () => Promise<T>,
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
      setObservableValue(newObservable, result);
    });
  };
  listener();

  return newObservable;
}
