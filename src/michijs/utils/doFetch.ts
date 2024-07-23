import { createURL, type SearchParams } from "../routing";
import type { AnyObject, DoFetchProps, UseFetchOptions } from "../types";

export const doFetch = async <
  R,
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
>(
  { input, searchParams, ...init }: DoFetchProps<S, B>,
  options?: UseFetchOptions<R>,
): Promise<R> => {
  const url = createURL(input, {
    baseURL: input.startsWith("/") ? location.origin : undefined,
    searchParams,
  });

  const response = await fetch(url, {
    ...init,
    body:
      typeof init?.body === "object" ? JSON.stringify(init.body) : init?.body,
  });

  if (!response.ok) throw response.statusText ? response.statusText : await response.text();

  const jsonResult = (await response.json()) as R;
  return options?.transform?.(jsonResult) ?? jsonResult;
};
