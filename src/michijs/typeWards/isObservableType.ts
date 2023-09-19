import { ObservableLike, ObservableType } from "../types";

export function isObservableType<T>(
  jsx: T,
): jsx is ObservableType<T> {
  // in does not work with primitive types
  return !!(jsx as ObservableLike).subscribe;
}
