import type { ObservableLike, RefSubscription, Subscription } from "../types";

export const overrideCallbackWithRef = <
  T extends ObservableLike<any>,
  E extends WeakKey,
>(
  observable: T,
  val: E,
  callback: RefSubscription<T extends ObservableLike<infer Y> ? Y : T, E>,
): Subscription<T extends ObservableLike<infer Y> ? Y : T> => {
  let overridenCallback: Subscription<
    T extends ObservableLike<infer Y> ? Y : T
  >
  removeObservablesGarbageCollection: {
    const ref = new WeakRef(val);
    overridenCallback = (signal) => {
      const el = ref.deref();

      if (el) callback(signal, el);
      else observable.unsubscribe(overridenCallback);
    };
  }
  overridenCallback ??= (signal) => callback(signal, val);
  observable.subscribe(overridenCallback);
  return overridenCallback;
};
