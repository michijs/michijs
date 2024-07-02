import { useObserve } from ".";
import { useWatch } from "./useWatch";

/**
 * @typedef {import('../types').ObservableType} ObservableType
 * @typedef {import('../types').UseComputedObserveOptions} UseComputedObserveOptions
 * @typedef {import('../types').useWatchDeps} useWatchDeps
 */



/**
 * @typedef {object} UseComputedObserve
 */

/**
 * It is used for computing a value and observing its changes.
 * @returns {*} A new observable
 */
export const useComputedObserve = (callback, deps, options) => {
    const newObservable = useObserve(callback());

    const listener = () => {
        const callbackResult = callback();
        options?.onBeforeUpdate?.();
        newObservable(callbackResult);
        options?.onAfterUpdate?.();
    };
    useWatch(listener, deps);

    return newObservable;
};
