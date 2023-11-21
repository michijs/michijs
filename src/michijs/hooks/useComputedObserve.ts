import { ObservableType } from "../types";
import { useObserve } from "./useObserve";
import { setObservableValue } from "../utils";
import { useWatch, useWatchDeps } from "./useWatch";

export function useComputedObserve<T>(
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

  useWatch(listener, deps)

  return newObservable;
}
