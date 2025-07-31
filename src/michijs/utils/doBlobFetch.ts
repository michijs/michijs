import type { SearchParams } from "../routing/types";
import type { AnyObject, DoFetchProps } from "../types";
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
