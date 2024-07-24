import type { ObservableLike, RefSubscription, Subscription } from "../types";

export const overrideCallbackWithRef = <
  Y,
  T extends ObservableLike<Y>,
  E extends WeakKey,
>(
  val: E,
  observable: T,
  callback: RefSubscription<Y, E>,
): Subscription<Y> => {
  const ref = new WeakRef(val);
  const overridenCallback: Subscription<Y> = (signal: Y) => {
    const el = ref.deref();

    if (el) callback(signal, el);
    else observable.unsubscribe(overridenCallback);
  };
  observable.subscribe(overridenCallback);
  return overridenCallback;
};
