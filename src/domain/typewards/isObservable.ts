import type { ObservablePort } from "#ports";

// "in" does not work with primitive types
export const isObservable = (jsx: any): jsx is ObservablePort<unknown> =>
  !!(jsx as ObservablePort<unknown>)?.subscribe;
