import { doFetch } from "../utils";
import { usePromise } from "./usePromise";

/**
 * @typedef {import('../routing/types').SearchParams} SearchParams
 */

/**
 * @typedef {import('../types').ObservableType} ObservableType
 * @typedef {import('../types').FetchResult} FetchResult
 * @typedef {import('../types').AnyObject} AnyObject
 * @typedef {import('../types').UseFetchOptions} UseFetchOptions
 * @typedef {import('../types').UseFetchCallback} UseFetchCallback
 * @typedef {import('../types').usePromiseShouldWait} usePromiseShouldWait
 */

/**
 * Fetches data from a URL, parses the response as JSON and allows to manage the result as an observable.
 * @template R Type of the expected response data.
 * @template S Type of the optional search parameters.
 * @template R
 * @template {SearchParams} [S = undefined]
 * @template {AnyObject | undefined | string} [B = undefined]
 * @param {UseFetchCallback<S, B>} callback
 * @param {usePromiseShouldWait} [shouldWait]
 * @param {UseFetchOptions<R>} [options] An optional object that may contain shouldWaitToFetch callback function.
 * @returns {ObservableType<FetchResult<R>>} An Observable that emits the result of the fetch operation.
 */
export const useFetch = (callback, shouldWait, options) =>
  usePromise(async () => doFetch(await callback(), options), shouldWait);
