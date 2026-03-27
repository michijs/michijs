import type { IsAny } from "@shared";
import type { ObservablePort } from "@ports";

export type UnproxifyPort<T> = IsAny<T> extends true
  ? any
  : T extends ObservablePort<infer Y>
    ? [Y] extends [object]
      ? {
          [k in keyof Y]: UnproxifyPort<Y[k]>;
        }
      : Y
    : T;
