import { useComputedObserve, useObserve } from ".";
import { setObservableValue } from "../utils/setObservableValue";

export function useAsyncComputedObserve<T>(
  callback: () => Promise<T>,
  deps: Parameters<typeof useComputedObserve<T>>[1],
  initialValue: T,
) {
  const newObservable = useObserve(initialValue);

  const listener = () => {
    callback().then((result) => {
      setObservableValue(newObservable, result);
    });
  };
  listener();

  deps.forEach((x) => x.subscribe?.(listener));
  return newObservable;
}
