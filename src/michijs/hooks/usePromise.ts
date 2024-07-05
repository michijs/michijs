import type { PromiseResult, usePromiseShouldWait } from "../types";
import { bindObservable } from "../utils";
import { useObserve } from "./useObserve";
import { useWatch } from "./useWatch";

/**
 * Ues a promise and allows to manage the result as an observable.
 *
 * @param promise The operation.
 * @param deps Dependencies to watch for changes.
 * @param options An optional object that may contain shouldWait callback function.
 * @returns An Observable that emits the result of the promise operation.
 * @template R Type of the expected response data.
 */
export const usePromise = <R>(
  promise: () => Promise<R>,
  shouldWait?: usePromiseShouldWait,
): PromiseResult<R> => {
  let internalPromiseWithResolvers = Promise.withResolvers<R>();

  const result = {
    promise: useObserve(internalPromiseWithResolvers.promise),
    async recall() {
      await result.promise();
      internalPromiseWithResolvers = Promise.withResolvers<R>();
      result.promise(internalPromiseWithResolvers.promise);
      await tryToResolvePromiseCallback();
    },
  };

  const tryToResolvePromiseCallback = async () => {
    const promises = shouldWait?.map<Promise<any>>((x) =>
      x instanceof Promise ? x : x(),
    );
    let readyToExecute = true;
    if (promises) {
      try {
        // If some promise fails
        await Promise.all(promises);
      } catch {
        readyToExecute = false;
      }
    }
    if (readyToExecute) {
      try {
        const promiseResult = await promise();
        internalPromiseWithResolvers.resolve(promiseResult);
      } catch (ex) {
        internalPromiseWithResolvers.reject(ex);
      }
    }
  };

  tryToResolvePromiseCallback()

  useWatch(result.recall, shouldWait);

  return result as unknown as PromiseResult<R>;
};
