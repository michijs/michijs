import type { SearchParams } from "../routing/types";
import type { AnyObject, DoFetchProps, UseFetchOptions } from "../types";
import { doGenericFetch } from "./doGenericFetch";

export const doFetch = async <
  R,
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
>(
  request: DoFetchProps<S, B>,
  options?: UseFetchOptions<R>,
): Promise<R> => {
  const response = await doGenericFetch(request);

  const jsonResult = (await response.json()) as R;
  return options?.transform?.(jsonResult, response) ?? jsonResult;
};
