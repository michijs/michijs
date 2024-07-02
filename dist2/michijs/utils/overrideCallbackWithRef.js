/**
 * @typedef {import('../types').ObservableLike} ObservableLike
 * @typedef {import('../types').RefSubscription} RefSubscription
 * @typedef {import('../types').Subscription} Subscription
 */

/**
 * @template Y
 * @template {ObservableLike<Y>} T
 * @template {WeakKey} E
 * @param {E} val
 * @param {T} observable
 * @param {RefSubscription<Y, E>} callback
 * @returns {Subscription<Y>}
 */
export const overrideCallbackWithRef = (val, observable, callback) => {
    const ref = new WeakRef(val);
    const overridenCallback = (signal) => {
        const el = ref.deref();

        if (el)
            callback(signal, el);
        else
            observable.unsubscribe(overridenCallback);
    };
    observable.subscribe(overridenCallback);
    return overridenCallback;
};
