/**
 * @typedef {import('../routing').SearchParams} SearchParams
 */

/**
 * @typedef {import('../types').AnyObject} AnyObject
 * @typedef {import('../types').DoFetchProps} DoFetchProps
 * @typedef {import('../types').UseFetchOptions} UseFetchOptions
 */

/**
 * @template R
 * @template {SearchParams} [S = undefined]
 * @template {AnyObject | undefined | string} [B = undefined]
 * @param {DoFetchProps<S, B>}
 * @param {UseFetchOptions<R>} [options]
 * @returns {Promise<R>}
 */
export const doFetch = async ({ input, searchParams, ...init }, options) => {
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

  const jsonResult = await response.json();
  return options?.transform?.(jsonResult) ?? jsonResult;
};
