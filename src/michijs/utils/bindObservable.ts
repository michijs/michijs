import { isObservableType } from "../typeWards/isObservableType";
import { Subscription } from "../types";

export const bindObservable = <T>(
  observable: T,
  callback: Subscription<T>,
) => {
  if (isObservableType(observable)) {
    observable.subscribe?.(callback);
    callback(observable.valueOf() as T);
  } else callback(observable);
};
