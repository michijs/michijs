import { isObservableType } from "../typeWards/isObservableType";
import { ObservableType, ObserverCallback } from "../types";

export const bindObservable = <T extends unknown>(
  observable: ObservableType<T> | T,
  callback: ObserverCallback<T>,
) => {
  if (isObservableType(observable)) {
    observable.subscribe?.(callback);
    callback(observable.valueOf() as T);
  } else callback(observable);
};
