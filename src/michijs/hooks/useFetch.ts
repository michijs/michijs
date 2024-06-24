import type { SearchParams } from "../routing/types";
import type {
  ObservableType,
  FetchResult,
  AnyObject,
  UseFetchOptions,
  UseFetchCallback,
  usePromiseShouldWait,
} from "../types";
import { doFetch } from "../utils";
import { usePromise } from "./usePromise";

/**
 * Fetches data from a URL, parses the response as JSON and allows to manage the result as an observable.
 *
 * @param input The URL to fetch data from.
 * @param searchParams Optional search parameters to append to the URL.
 * @param init Optional request initialization options.
 * @param deps Dependencies to watch for changes.
 * @param options An optional object that may contain shouldWaitToFetch callback function.
 * @returns An Observable that emits the result of the fetch operation.
 * @template R Type of the expected response data.
 * @template S Type of the optional search parameters.
 */
export const useFetch = <
  R,
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
>(
  callback: UseFetchCallback<S, B>,
  shouldWait?: usePromiseShouldWait,
  options?: UseFetchOptions<R>
): ObservableType<FetchResult<R>> => usePromise(
  async () => doFetch(await callback(), options),
  shouldWait
) as ObservableType<FetchResult<R>>;
