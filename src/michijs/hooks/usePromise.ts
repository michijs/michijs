import type { PromiseResult, usePromiseShouldWait } from "../types";
import { useObserve } from "./useObserve";
import { useWatch } from "./useWatch";

/**
 * Ues a promise and allows to manage the result as an observable.
 *
 * @param callback The operation.
 * @param shouldWait All the promises that should resolve before executing the promise.
 * @returns An Observable that emits the result of the promise operation.
 * @template R Type of the expected response data.
 */
export const usePromise = <R>(
  callback: () => Promise<R>,
  shouldWait?: usePromiseShouldWait,
): PromiseResult<R> => {
  let internalPromiseWithResolvers = Promise.withResolvers<R>();
  let loading = false;

  const result = {
    promise: useObserve(internalPromiseWithResolvers.promise),
    async recall() {
      if (!loading) {
        try {
          await result.promise();
        } catch {}
        internalPromiseWithResolvers = Promise.withResolvers<R>();
        result.promise(internalPromiseWithResolvers.promise);
      }
      await tryToResolvePromiseCallback();
    },
  };

  const tryToResolvePromiseCallback = async () => {
    loading = true;
    const promises = shouldWait?.map((x) => (x instanceof Promise ? x : x()));
    let finishedWaiting = true;
    try {
      if (promises) {
        // If some promise fails
        try {
          await Promise.all(promises);
        } catch {
          finishedWaiting = false;
        }
      }
      if (finishedWaiting) {
        loading = false;
        const promiseResult = await callback();
        internalPromiseWithResolvers.resolve(promiseResult);
      }
    } catch (ex) {
      internalPromiseWithResolvers.reject(ex);
    }
  };

  tryToResolvePromiseCallback();

  useWatch(result.recall, shouldWait);

  return result as unknown as PromiseResult<R>;
};
