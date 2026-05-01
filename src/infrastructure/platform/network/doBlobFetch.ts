import type { AnyObject, SearchParams } from "#shared";
import type { DoFetchProps } from "./types";
import { doGenericFetch } from "./doGenericFetch";

export const doBlobFetch = async <
  R = Blob,
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
>(
  request: DoFetchProps<S, B>,
): Promise<R> => {
  const response = await doGenericFetch(request);
  return (await response.blob()) as R;
};
