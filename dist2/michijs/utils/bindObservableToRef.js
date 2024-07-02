import { isObservableType } from "../typeWards/isObservableType";
import { overrideCallbackWithRef } from "./overrideCallbackWithRef";

/**
 * @typedef {import('../types').ObservableLike} ObservableLike
 * @typedef {import('../types').RefSubscription} RefSubscription
 */



/**
 * @template T
 * @template {WeakKey} E
 * @param {T} observable
 * @param {E} el
 * @param {RefSubscription<T extends ObservableLike<infer Y> ? Y : T, E>} callback
 */
export const bindObservableToRef = (observable, el, callback) => {
    if (isObservableType(observable)) {
        const overridenCallback = overrideCallbackWithRef(el, observable, callback);
        overridenCallback(observable.valueOf());
    }
    else
        callback(observable, el);
};
