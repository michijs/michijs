import { useObserve } from "./useObserve";
import type { UseComputedObserve } from "../types";
import { useSharedComputedObserve } from "./useSharedComputedObserve";

/**
 * It is used for computing a value and observing its changes.
 * @param callback A function that returns a value of type T.
 * @param deps Dependencies to watch for changes.
 * @param options An optional object that may contain onBeforeUpdate and onAfterUpdate callback functions.
 * @returns A new observable
 */
export const useComputedObserve: UseComputedObserve = (
  callback,
  deps,
  options,
) => useSharedComputedObserve(useObserve, callback, deps, options);;
