import { isObservableType } from "../typeWards/isObservableType";
import type { ObservableLike, RefSubscription } from "../types";
import { getObservables } from "./getObservables";
import { extendsObject } from "./extendsObject";
import { overrideCallbackWithRef } from "./overrideCallbackWithRef";
import { useComputedObservePrimitive } from "../hooks/useComputedObservePrimitive";

const overrideAndCallCallback = <T, E extends WeakKey>(
  observable: T,
  el: E,
  callback: RefSubscription<T extends ObservableLike<infer Y> ? Y : T, E>,
  shouldIgnoreFirstCallback?: boolean,
) => {
  const overridenCallback = overrideCallbackWithRef(
    observable as ObservableLike<T extends ObservableLike<infer Y> ? Y : T>,
    el,
    callback,
  );
  if (!shouldIgnoreFirstCallback)
    overridenCallback(
      // @ts-ignore
      observable.valueOf(),
    );
};

export const bindObservableToRef = <T, E extends WeakKey>(
  observable: T,
  el: E,
  callback: RefSubscription<T extends ObservableLike<infer Y> ? Y : T, E>,
  shouldIgnoreFirstCallback?: boolean,
): void => {
  const isObservableTypeResult = isObservableType(observable);
  if (isObservableTypeResult) {
    overrideAndCallCallback(
      observable,
      el,
      callback,
      shouldIgnoreFirstCallback,
    );
    return;
  }
  if (extendsObject(observable)) {
    const observables = getObservables(observable);
    if (observables.length > 0) {
      const finalObservable = useComputedObservePrimitive(
        () => observable,
        observables,
      );
      overrideAndCallCallback(
        finalObservable as T,
        el,
        callback,
        shouldIgnoreFirstCallback,
      );
      return;
    }
  }
  if (!shouldIgnoreFirstCallback)
    callback(observable as T extends ObservableLike<infer Y> ? Y : T, el);
};
