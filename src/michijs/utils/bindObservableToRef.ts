import { isObservable } from "../typeWards/isObservable";
import type { ObservableLike, RefSubscription } from "../types";
import { getObservables } from "./getObservables";
import { extendsObject } from "./extendsObject";
import { overrideCallbackWithRef } from "./overrideCallbackWithRef";
import { useComputedObserve } from "../hooks/useComputedObserve";

export const bindObservableToRef = <T, E extends WeakKey>(
  observable: T,
  el: E,
  callback: RefSubscription<T extends ObservableLike<infer Y> ? Y : T, E>,
  shouldIgnoreFirstCallback?: boolean,
): void => {
  if (isObservable(observable)) {
    const overriddenCallback = overrideCallbackWithRef(
      observable,
      el,
      callback,
    );
    if (!shouldIgnoreFirstCallback)
      // @ts-ignore
      overriddenCallback(observable.valueOf());
    return;
  }

  removeDeepBindingObservableObjects: {
    if (extendsObject(observable)) {
      const observables = getObservables(observable);
      if (observables.length > 0) {
        const finalObservable = useComputedObserve(
          () => observable,
          observables,
          { usePrimitive: true },
        );
        const overriddenCallback = overrideCallbackWithRef(
          finalObservable as T & ObservableLike<unknown>,
          el,
          callback,
        );
        if (!shouldIgnoreFirstCallback)
          // @ts-ignore
          overriddenCallback(finalObservable.valueOf());
        return;
      }
    }
  }
  if (!shouldIgnoreFirstCallback)
    callback(observable as T extends ObservableLike<infer Y> ? Y : T, el);
};
