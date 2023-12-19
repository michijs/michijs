import { useObserve } from ".";
import { setObservableValue } from "../utils";
import { useWatch, useWatchDeps } from "./useWatch";

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
