import { ObservableLike } from "../types";

export function isObservableType<T>(
  jsx: T,
  // @ts-ignore
): jsx is ObservableLike<T> {
  // in does not work with primitive types
  return !!(jsx as ObservableLike).subscribe;
}
