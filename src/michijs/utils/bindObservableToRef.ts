import { useComputedObserve } from "../hooks/useComputedObserve";
import { isObservableType } from "../typeWards/isObservableType";
import type { ObservableLike, RefSubscription } from "../types";
import { getObservables } from "./getObservables";
import { extendsObject } from "./extendsObject";
import { overrideCallbackWithRef } from "./overrideCallbackWithRef";

export const bindObservableToRef = <T, E extends WeakKey>(
  observable: T,
  el: E,
  callback: RefSubscription<T extends ObservableLike<infer Y> ? Y : T, E>,
): void => {
  const isObservableTypeResult = isObservableType(observable);
  if (isObservableTypeResult || extendsObject(observable)) {
    let finalObservable;
    if (isObservableTypeResult) finalObservable = observable;
    else {
      const observables = getObservables(observable);
      if (observables.length > 0)
        finalObservable = useComputedObserve(() => observable, observables);
    }
    const overridenCallback = overrideCallbackWithRef(
      finalObservable as ObservableLike<
        T extends ObservableLike<infer Y> ? Y : T
      >,
      el,
      callback,
    );
    overridenCallback(
      // @ts-ignore
      finalObservable.valueOf(),
    );
    return;
  }
  callback(observable as T extends ObservableLike<infer Y> ? Y : T, el);
};
