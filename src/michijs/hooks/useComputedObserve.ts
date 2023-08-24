import { ObservableType, ObservableLike } from "../types";
import { useObserve } from "./useObserve";
import { setObservableValue } from "../utils/setObservableValue";

export const useComputedObserve = <T>(
  callback: () => T,
  deps: Partial<ObservableLike<any>>[],
): ObservableType<T> => {
  const newObservable = useObserve(callback());

  const listener = () => setObservableValue(newObservable, callback());

  deps.forEach((x) => x.subscribe?.(listener));

  return newObservable;
};
