import { useObservePrimitive } from "./useObservePrimitive";
import { useSharedComputedObserve } from "./useSharedComputedObserve";
import type { UseComputedObservePrimitive } from "../types";

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
) => useSharedComputedObserve(useObservePrimitive, callback, deps, options);
