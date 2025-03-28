import { isObservableType } from "../typeWards/isObservableType";
import type { ObservableLike, Subscription } from "../types";

export const bindObservable = <T>(
  observable: T,
  callback: Subscription<T extends ObservableLike<infer Y> ? Y : T>,
): void => {
  if (isObservableType(observable)) {
    observable.subscribe(callback as Subscription<unknown>);
    callback(observable.valueOf() as T extends ObservableLike<infer Y> ? Y : T);
  } else callback(observable as T extends ObservableLike<infer Y> ? Y : T);
};
