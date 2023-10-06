import { isObservableType } from "../typeWards/isObservableType";
import { ObserverCallback } from "../types";

export const bindObservable = <T>(
  observable: T,
  callback: ObserverCallback<T>,
) => {
  if (isObservableType(observable)) {
    observable.subscribe?.(callback);
    callback(observable.valueOf() as T);
  } else callback(observable);
};
