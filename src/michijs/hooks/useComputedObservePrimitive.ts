import { useObservePrimitive } from "./useObservePrimitive";
import type {
  ObservableType,
  UseComputedObservePrimitive,
} from "../types";
import { useWatch } from "./useWatch";

/**
 * It is used for computing a value and observing its changes. Primitive version of useComputedObserve
 * @param callback A function that returns a value of type T.
 * @param deps Dependencies to watch for changes.
 * @param options An optional object that may contain onBeforeUpdate and onAfterUpdate callback functions.
 * @returns A new observable
 */
export const useComputedObservePrimitive: UseComputedObservePrimitive = (
  callback,
  deps,
  options,
) => {
  const newObservable = useObservePrimitive(callback());

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
