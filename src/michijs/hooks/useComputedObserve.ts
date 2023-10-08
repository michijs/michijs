import { ObservableType, CompatibleObservableLike } from "../types";
import { useObserve } from "./useObserve";
import { setObservableValue } from "../utils";

export function useComputedObserve<T>(
  callback: () => T,
  deps: Partial<CompatibleObservableLike<any>>[],
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

  deps.forEach((x) => x.subscribe?.(listener));

  return newObservable;
}
