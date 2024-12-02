import { PrimitiveValue } from "../classes/PrimitiveValue";
import type { PrimitiveObservableType } from "../types";

/**
 * Unproxied version of useObserve. Similar to tc39 signals proposal
 * @param item The value to be observed.
 * @returns A new primitive observable
 */
export const useObservePrimitive = <T>(item?: T): PrimitiveObservableType<T> =>
  new PrimitiveValue<any>(item) as unknown as PrimitiveObservableType<T>;
