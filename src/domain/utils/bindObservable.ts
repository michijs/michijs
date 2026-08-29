import { useComputedObserve } from "../use-cases/hooks/useComputedObserve";
import { isObservable } from "../typewards/isObservable";
import type { ObservablePort, Subscription } from "#ports";
import { extendsObject } from "#shared";
import { getObservables } from "./getObservables";

export const bindObservable = <T>(
  observable: T,
  callback: Subscription<T extends ObservablePort<infer Y> ? Y : T>,
  enableDeepBinding?: boolean,
): T => {
  if (isObservable(observable)) {
    observable.subscribe(callback as Subscription<unknown>);
    callback(observable.valueOf() as T extends ObservablePort<infer Y> ? Y : T);
    return observable;
  }
  removePromiseAttributes: {
    if (observable instanceof Promise) {
      observable.then(callback);
      return observable;
    }
  }
  removeDeepBindingObservableObjects: {
    if (enableDeepBinding && extendsObject(observable)) {
      const observables = getObservables(observable);
      if (observables.length > 0) {
        const finalObservable = useComputedObserve(() => observable, {
          deps: observables,
        }) as T;
        // @ts-ignore
        callback(finalObservable());
        return finalObservable;
      }
    }
  }
  callback(observable as T extends ObservablePort<infer Y> ? Y : T);
  return observable;
};
