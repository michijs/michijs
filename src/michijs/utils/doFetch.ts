import type { SearchParams } from "../routing/types";
import { createURL } from "../routing/utils/createURL";
import type { AnyObject, DoFetchProps, UseFetchOptions } from "../types";

const getErrorMessage = async (response: Response): Promise<string> => {
  if (response.statusText) return response.statusText;

  const text = await response.text();

  try {
    const stringifiedObject = JSON.parse(text);
    // Usually there is a message field
    return stringifiedObject.message ?? stringifiedObject;
  } catch {
    return text;
  }
};

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
    cache: "no-cache",
    ...init,
    body:
      typeof init?.body === "object" ? JSON.stringify(init.body) : init?.body,
  });

  if (!response.ok) throw await getErrorMessage(response);

  const jsonResult = (await response.json()) as R;
  return options?.transform?.(jsonResult) ?? jsonResult;
};
