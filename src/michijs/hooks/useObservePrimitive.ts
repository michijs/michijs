import { PrimitiveValue } from "../classes/PrimitiveValue";
import type { PrimitiveObservableType } from "../types";

/**
 * Responsible for observing changes on different types of values.
 * @param item The value to be observed.
 * @returns A new primitive observable
 */
export function useObservePrimitive<T>(item?: T): PrimitiveObservableType<T> {
  return new PrimitiveValue<any>(item) as unknown as PrimitiveObservableType<T>;
}
