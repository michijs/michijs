import { ProxiedValue } from "../classes";
import { useWatch } from "./useWatch";

/**
 * @typedef {import('../types').useWatchDeps} useWatchDeps
 */

/**
 * It is used to create a memoized function that encapsulates the result of the provided callback function and updates it only when any of the dependencies change.
 * @template T
 * @param {() => T} callback A function that returns a value of type T.
 * @param {useWatchDeps} deps An array of dependencies that the callback function depends on
 * @returns {(() => ProxiedValue<T>)} A memoized function
 */
export const usePureFunction = (callback, deps) => {
  const proxiedValue = new ProxiedValue();
  let outdated = true;

  const listener = () => (outdated = true);

  useWatch(listener, deps);

  return () => {
    if (outdated) {
      outdated = false;
      proxiedValue.$value = callback();
    }
    return proxiedValue;
  };
};
