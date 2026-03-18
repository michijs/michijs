import type { ObservablePort } from "@ports";

export type ObservableOrConst<T> = ObservablePort<T> | T;
