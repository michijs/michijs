import { isObservableNonNullablePrimitiveType } from "../typeWards/isObservableNonNullablePrimitiveType";
import { Observable, ObserverCallback } from "../types";

export const bindObservable = <T extends unknown>(
  observable: T,
  callback: ObserverCallback<T>,
) => {
  if (isObservableNonNullablePrimitiveType(observable)) {
    (observable as Observable<T>).subscribe?.(callback);
    callback(observable.valueOf() as T);
  } else callback(observable);
};
