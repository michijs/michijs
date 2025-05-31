import { isObservable } from "../typeWards/isObservable";
import type { ObservableLike, Subscription } from "../types";

export const bindObservable = <T>(
  observable: T,
  callback: Subscription<T extends ObservableLike<infer Y> ? Y : T>,
): void => {
  if (isObservable(observable)) {
    observable.subscribe(callback as Subscription<unknown>);
    callback(observable.valueOf() as T extends ObservableLike<infer Y> ? Y : T);
  } else callback(observable as T extends ObservableLike<infer Y> ? Y : T);
};
