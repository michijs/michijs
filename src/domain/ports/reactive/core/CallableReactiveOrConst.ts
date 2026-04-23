import type { CallableReactiveValuePort } from "@ports";

// The CallableReactiveValuePort<T> branch handles exact matches.
// The (ReactiveValuePort<T> & { (): T }) branch is covariant (no setter call
// signature), allowing CallableReactiveValuePort<string> to be assigned to
// CallableReactiveOrConst<string | null>.
export type CallableReactiveOrConst<T> = CallableReactiveValuePort<T> | T;
