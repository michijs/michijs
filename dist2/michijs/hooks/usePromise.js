import { bindObservable } from "../utils";
import { useObserve } from "./useObserve";
import { useWatch } from "./useWatch";

/**
 * @typedef {import('../types').PromiseResult} PromiseResult
 * @typedef {import('../types').usePromiseShouldWait} usePromiseShouldWait
 */

/**
 * Ues a promise and allows to manage the result as an observable.
 * @template R Type of the expected response data.
 * @template R
 * @param {() => Promise<R>} promise The operation.
 * @param {usePromiseShouldWait} [shouldWait]
 * @returns {PromiseResult<R>} An Observable that emits the result of the promise operation.
 */
export const usePromise = (promise, shouldWait) => {
    let internalPromiseWithResolvers = Promise.withResolvers();

    const result = {
        promise: useObserve(internalPromiseWithResolvers.promise),
        recall() {
            internalPromiseWithResolvers = Promise.withResolvers();
            this.promise(internalPromiseWithResolvers.promise);
        },
    };

    const tryToResolvePromiseCallback = async () => {
        const promises = shouldWait?.map((x) => x instanceof Promise ? x : x());
        let readyToExecute = true;
        if (promises) {
            try {
                // If some promise fails
                await Promise.all(promises);
            }
            catch {
                readyToExecute = false;
            }
        }
        if (readyToExecute) {
            try {
                const promiseResult = await promise();
                internalPromiseWithResolvers.resolve(promiseResult);
            }
            catch (ex) {
                internalPromiseWithResolvers.reject(ex);
            }
        }
    };

    bindObservable(result.promise, tryToResolvePromiseCallback);

    useWatch(tryToResolvePromiseCallback, shouldWait);

    return result;
};
