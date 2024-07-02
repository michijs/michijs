import { useObserve } from ".";
import { useWatch } from "./useWatch";

/**
 * @typedef {import('../types').ObservableType} ObservableType
 * @typedef {import('../types').UseComputedObserveOptions} UseComputedObserveOptions
 * @typedef {import('../types').useWatchDeps} useWatchDeps
 */

/**
 * @typedef {object} UseAsyncComputedObserve
 */

/**
 * It is used for computing a value and observing its changes.
 * @returns {*} A new observable
 */
export const useAsyncComputedObserve = (
  callback,
  initialValue,
  deps,
  options,
) => {
  const newObservable = useObserve(initialValue);

  const listener = async () => {
    const callbackResult = await callback();
    options?.onBeforeUpdate?.();
    newObservable(callbackResult);
    options?.onAfterUpdate?.();
  };
  useWatch(listener, deps);

  return newObservable;
};
