import type { SearchParams } from "../routing";
import type { AnyObject, DoFetchProps, UseFetchOptions } from "../types";

export const doFetch = async <
  R,
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
>(
  { input, searchParams, ...init }: DoFetchProps<S, B>,
  options?: UseFetchOptions<R>,
): Promise<R> => {
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
      typeof init?.body === "object" ? JSON.stringify(init.body) : init?.body,
  });

  if (!response.ok) throw response.statusText;

  const jsonResult = (await response.json()) as R;
  return options?.transform?.(jsonResult) ?? jsonResult;
};
