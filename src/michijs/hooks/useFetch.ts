import type { UseFetch } from "../types";
import { doFetch } from "../utils/doFetch";
import { usePromise } from "./usePromise";

/**
 * Fetches data from a URL, parses the response as JSON and allows to manage the result as an observable.
 *
 * @param callback The callback to get the options for the request
 * @param shouldWait All the promises that should resolve before executing the promise.
 * @param options Some additional options
 * @returns An Observable that emits the result of the fetch operation.
 * @template R Type of the expected response data.
 * @template S Type of the optional search parameters.
 * @template B Type of the optional body.
 */
export const useFetch: UseFetch = (callback, shouldWait, options) =>
  usePromise(async () => doFetch(await callback(), options), shouldWait);
