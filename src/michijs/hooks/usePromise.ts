import type {
  ObservableType,
  FetchResult,
  UseFetchOptions,
  useWatchDeps,
  PromiseResult,
} from "../types";
import { useComputedObserve } from "./useComputedObserve";
import { useObserve } from "./useObserve";

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
  deps?: useWatchDeps,
  options?: UseFetchOptions,
): ObservableType<PromiseResult<R>> => {

  let resolveOut: (value: R | PromiseLike<R>) => void;
  const internalPromise = new Promise<R>(resolve => {
    resolveOut = resolve
  })
  const initialPromiseValue = {
    loading: true,
    promise: internalPromise,
  } as const;
  const recalls = useObserve(0);
  const recall = () => recalls(recalls() + 1);
  const result = useComputedObserve<FetchResult<R>, typeof initialPromiseValue>(
    async () => {
      if (!options?.shouldWait?.()) {
        try {
          const result = await promise();
          resolveOut(result)
          return {
            loading: false,
            result,
            promise: internalPromise,
            recall,
          };
        } catch (ex) {
          console.error(ex)
          return {
            error: new Error(ex),
            loading: false,
            promise: internalPromise,
            recall,
          };
        }
      } else return initialPromiseValue;
    },
    [...(deps ?? []), recalls],
    initialPromiseValue,
  );

  return result;
};
