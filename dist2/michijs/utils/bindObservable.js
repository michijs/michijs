import { isObservableType } from "../typeWards/isObservableType";

/**
 * @typedef {import('../types').ObservableLike} ObservableLike
 * @typedef {import('../types').Subscription} Subscription
 */

/**
 * @template T
 * @param {T} observable
 * @param {Subscription<T extends ObservableLike<infer Y> ? Y : T>} callback
 */
export const bindObservable = (observable, callback) => {
  if (isObservableType(observable)) {
    observable.subscribe(callback);
    callback(observable.valueOf());
  } else callback(observable);
};
