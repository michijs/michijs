import type { UsePromisePort } from "#ports";
import { useObserve } from "./useObserve";
import { useWatch } from "./useWatch";

const createResolvers = () => {
  const resolvers = Promise.withResolvers();
  // Consumers handle rejections through `result.promise`; this avoids
  // reporting an unhandled rejection when nobody is listening yet.
  resolvers.promise.catch(() => {});
  return resolvers;
};

/**
 * Ues a promise and allows to manage the result as an observable.
 *
 * @param callback The operation.
 * @param shouldWait All the promises that should resolve before executing the promise.
 * @returns An Observable that emits the result of the promise operation.
 * @template R Type of the expected response data.
 */
export const usePromise: UsePromisePort = (callback, shouldWait) => {
  let internalPromiseWithResolvers = createResolvers();
  let loading = false;
  let settled = false;

  const result = {
    promise: useObserve(internalPromiseWithResolvers.promise, true),
    async recall() {
      if (loading) return;
      // Keep the pending promise if the previous attempt never settled
      // (e.g. a `shouldWait` promise failed), so existing awaiters still resolve.
      if (settled) {
        settled = false;
        internalPromiseWithResolvers = createResolvers();
        result.promise(internalPromiseWithResolvers.promise);
      }
      await tryToResolvePromiseCallback();
    },
  };

  const tryToResolvePromiseCallback = async () => {
    loading = true;
    const currentResolvers = internalPromiseWithResolvers;
    try {
      if (shouldWait) {
        try {
          await Promise.all(
            shouldWait.map((x) => (x instanceof Promise ? x : x())),
          );
        } catch {
          // Wait for the next recall
          return;
        }
      }
      try {
        currentResolvers.resolve(await callback());
      } catch (ex) {
        currentResolvers.reject(ex);
      }
      settled = true;
    } finally {
      loading = false;
    }
  };

  tryToResolvePromiseCallback();

  useWatch(result.recall, shouldWait);

  return result as any;
};
