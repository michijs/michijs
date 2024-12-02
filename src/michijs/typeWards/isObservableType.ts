import type { ObservableLike } from "../types";

// "in" does not work with primitive types
export const isObservableType = (jsx: any): jsx is ObservableLike<unknown> =>
  !!(jsx as ObservableLike<unknown>)?.subscribe;
