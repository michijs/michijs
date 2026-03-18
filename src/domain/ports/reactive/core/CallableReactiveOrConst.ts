import type { CallableReactiveValuePort } from "@ports";

export type CallableReactiveOrConst<T> = CallableReactiveValuePort<T> | T;
