import { ObservableNonNullablePrimitiveType, ObservableLike } from "../types";

export function isObservableNonNullablePrimitiveType(
  jsx: unknown,
): jsx is ObservableNonNullablePrimitiveType {
  // in does not work with primitive types
  return !!(jsx as ObservableLike).subscribe;
}
