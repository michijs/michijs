import { PrimitiveValue } from "../classes/PrimitiveValue";
import type { UseObservePrimitive } from "../types";

/**
 * Unproxied version of useObserve. Similar to tc39 signals proposal
 * @param item The value to be observed.
 * @returns A new primitive observable
 */
export const useObservePrimitive: UseObservePrimitive = (item) =>
  new PrimitiveValue(item) as any;
