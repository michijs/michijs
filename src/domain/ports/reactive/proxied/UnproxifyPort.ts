import type { IsAny } from "@shared";
import type { ObservableProxyPort } from "@ports";


export type UnproxifyPort<T> = IsAny<T> extends true ? any : T extends ObservableProxyPort<infer Y> ? [Y] extends [object] ? {
  [k in keyof Y]: UnproxifyPort<Y[k]>;
} : Y : T;
