import { useComputedObserve } from "../hooks/useComputedObserve";
import { isObservable } from "../typeWards/isObservable";
import type { ObservableLike, Subscription } from "../types";
import { extendsObject } from "./extendsObject";
import { getObservables } from "./getObservables";

export const bindObservable = <T>(
  observable: T,
  callback: Subscription<T extends ObservableLike<infer Y> ? Y : T>,
  enableDeepBinding?: boolean,
): T => {
  if (isObservable(observable)) {
    observable.subscribe(callback as Subscription<unknown>);
    callback(observable.valueOf() as T extends ObservableLike<infer Y> ? Y : T);
    return observable;
  }
  removeDeepBindingObservableObjects: {
    if (enableDeepBinding && extendsObject(observable)) {
      const observables = getObservables(observable);
      if (observables.length > 0) {
        const finalObservable = useComputedObserve(
          () => observable,
          observables,
          { usePrimitive: true },
        ) as T;
        // @ts-ignore
        callback(finalObservable.valueOf());
        return finalObservable;
      }
    }
  }
  callback(observable as T extends ObservableLike<infer Y> ? Y : T);
  return observable;
};
