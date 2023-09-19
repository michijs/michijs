import { ObservableType, ObservableLike } from "../types";
import { useObserve } from "./useObserve";
import { setObservableValue } from "../utils";

export function useComputedObserve<T>(
  callback: () => T,
  deps: Partial<ObservableLike<any>>[],
): ObservableType<T> {
  const newObservable = useObserve(callback());
  console.log(newObservable)

  const listener = () => setObservableValue(newObservable, callback());

  deps.forEach((x) => x.subscribe?.(listener));

  return newObservable;
};
