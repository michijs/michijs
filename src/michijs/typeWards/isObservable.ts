import type { ObservableLike } from "../types";

// "in" does not work with primitive types
export const isObservable = (jsx: any): jsx is ObservableLike<unknown> =>
  !!(jsx as ObservableLike<unknown>)?.subscribe;
