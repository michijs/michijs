import { isObservableType } from "../typeWards/isObservableType";
import { ObservableLike, RefSubscription } from "../types";
import { overrideCallbackWithRef } from "./overrideCallbackWithRef";

export const bindObservableToRef = <T, E extends WeakKey>(
  observable: T,
  el: E,
  callback: RefSubscription<T extends ObservableLike<infer Y> ? Y : T, E>,
) => {
  if (isObservableType(observable)) {
    const overridenCallback = overrideCallbackWithRef(el, observable as ObservableLike<T extends ObservableLike<infer Y> ? Y : T>, callback)
    overridenCallback(observable.valueOf() as T extends ObservableLike<infer Y> ? Y : T);
  } else 
    callback(observable as T extends ObservableLike<infer Y> ? Y : T, el)
  ;
};
