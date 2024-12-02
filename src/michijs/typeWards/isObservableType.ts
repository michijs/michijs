import type { ObservableLike } from "../types";

export function isObservableType(jsx: any): jsx is ObservableLike<unknown> {
  // "in" does not work with primitive types
  return !!(jsx as ObservableLike<unknown>)?.subscribe;
}
