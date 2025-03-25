import type { SearchParams } from "../routing/types";
import type { AnyObject, DoFetchProps, UseFetchOptions } from "../types";
import { doGenericFetch } from "./doGenericFetch";

export const doBlobFetch = async <
  R = Blob,
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
>(
  request: DoFetchProps<S, B>,
  options?: UseFetchOptions<Blob, R>,
): Promise<R> => {
  const response = await doGenericFetch(request);

  const blobResult = await response.blob();
  return (options?.transform?.(blobResult, response) ?? blobResult) as R;
};
