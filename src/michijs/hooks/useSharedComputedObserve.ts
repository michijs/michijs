import type { ObservableType, UseSharedComputedObserve } from "../types";
import { useWatch } from "./useWatch";

export const useSharedComputedObserve: UseSharedComputedObserve = (
  useObserveCall,
  callback,
  deps,
  options,
) => {
  const newObservable = useObserveCall(callback());

  const listener = () => {
    try {
      const callbackResult = callback();
      options?.onBeforeUpdate?.();
      (newObservable as ObservableType<object>)(callbackResult as object);
      options?.onAfterUpdate?.();
    } catch (ex) {
      console.error(ex);
    }
  };
  useWatch(listener, deps);

  return newObservable;
};
