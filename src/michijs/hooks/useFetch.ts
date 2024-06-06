import type { SearchParams } from "../routing/types";
import type {
  ObservableType,
  FetchResult,
  AnyObject,
  UseFetchOptions,
  useWatchDeps,
  UseFetchCallback,
} from "../types";
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
  deps?: useWatchDeps,
  options?: UseFetchOptions,
): ObservableType<FetchResult<R>> => {
  const result = usePromise(
    async () => {
      const { input, searchParams, ...init } = callback();
      const url = new URL(
        input,
        input.startsWith("/") ? location.origin : undefined,
      );
      if (searchParams)
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value) url.searchParams.append(key, value.toString());
        });

      const response = await fetch(url, {
        ...init,
        body:
          typeof init?.body === "object"
            ? JSON.stringify(init.body)
            : init?.body,
      });
      result.status(response.status);

      if (!response.ok) throw response.statusText;

      return (await response.json()) as R;
    },
    deps,
    options,
  ) as ObservableType<FetchResult<R>>;

  return result;
};
