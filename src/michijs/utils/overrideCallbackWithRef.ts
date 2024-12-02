import type { ObservableLike, RefSubscription, Subscription } from "../types";

export const overrideCallbackWithRef = <
  T extends ObservableLike<any>,
  E extends WeakKey,
>(
  observable: T,
  val: E,
  callback: RefSubscription<T extends ObservableLike<infer Y> ? Y : T, E>,
): Subscription<T extends ObservableLike<infer Y> ? Y : T> => {
  const ref = new WeakRef(val);
  const overridenCallback: Subscription<T extends ObservableLike<infer Y> ? Y : T> = (signal: T extends ObservableLike<infer Y> ? Y : T) => {
    const el = ref.deref();

    if (el) callback(signal, el);
    else observable.unsubscribe(overridenCallback);
  };
  observable.subscribe(overridenCallback);
  return overridenCallback;
};
