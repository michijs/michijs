import type { SearchParams } from "../routing/types";
import type {
  ObservableType,
  FetchResult,
  AnyObject,
  RequestInitUseFetch,
} from "../types";
import { useAsyncObserve } from "./useAsyncObserve";

/**
 * Fetches data from a URL, parses the response as JSON and allows to manage the result as an observable.
 *
 * @param input The URL to fetch data from.
 * @param searchParams Optional search parameters to append to the URL.
 * @param init Optional request initialization options.
 * @returns An Observable that emits the result of the fetch operation.
 * @template R Type of the expected response data.
 * @template S Type of the optional search parameters.
 */
export const useFetch = <
  R,
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
>(
  input: string,
  searchParams?: S,
  init?: RequestInitUseFetch<B>,
): ObservableType<FetchResult<R>> => {
  const url = new URL(
    input,
    input.startsWith("/") ? location.origin : undefined,
  );
  if (searchParams)
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value.toString());
    });

  const result = useAsyncObserve<FetchResult<R>, { loading: true }>(
    async () => {
      try {
        const response = await fetch(url, {
          ...init,
          body:
            typeof init?.body === "object"
              ? JSON.stringify(init.body)
              : init?.body,
        });

        if (!response.ok) {
          return {
            headers: response.headers,
            status: response.status,
            loading: false,
            error: new Error(response.statusText),
          };
        }
        const value = (await response.json()) as R;
        return {
          headers: response.headers,
          status: response.status,
          loading: false,
          result: value,
        };
      } catch (ex) {
        return {
          error: new Error(ex),
          loading: false,
        };
      }
    },
    {
      loading: true,
    },
  );

  return result;
};
