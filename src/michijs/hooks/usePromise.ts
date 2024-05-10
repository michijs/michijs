import type {
  ObservableType,
  FetchResult,
  UseFetchOptions,
  useWatchDeps,
  PromiseResult,
} from "../types";
import { useComputedObserve } from "./useComputedObserve";
import { useObserve } from "./useObserve";

const initialPromiseValue = {
  loading: true,
} as const;

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
  const recalls = useObserve(0);
  const recall = () => recalls(recalls() + 1);
  const result = useComputedObserve<FetchResult<R>, typeof initialPromiseValue>(
    async () => {
      if (!options?.shouldWait?.()) {
        try {
          return {
            loading: false,
            result: (await promise()),
            recall,
          };
        } catch (ex) {
          return {
            error: new Error(ex),
            loading: false,
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
