import type { UseFetch } from "../../../../michijs/types";
import { doFetch } from "../doFetch";
import { usePromise } from "../../../../domain/use-cases/hooks/usePromise";

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
export const useFetch: UseFetch = (callback, shouldWait) =>
  usePromise(async () => doFetch(await callback()), shouldWait);
