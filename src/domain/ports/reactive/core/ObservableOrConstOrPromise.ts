import type { ObservableOrConst } from "@ports";

export type ObservableOrConstOrPromise<T> = ObservableOrConst<T> | Promise<T>;
