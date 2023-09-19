import { isObservableType } from "../typeWards/isObservableType";
import { ObservableType, ObserverCallback } from "../types";

export const bindObservable = <T extends unknown>(
  observable: T,
  callback: ObserverCallback<T>,
) => {
  if (isObservableType(observable)) {
    (observable as ObservableType<T>).subscribe?.(callback);
    callback(observable.valueOf() as T);
  } else callback(observable);
};
