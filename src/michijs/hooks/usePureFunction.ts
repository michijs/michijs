import { ProxiedValue } from "../classes";
import { useWatch, useWatchDeps } from "./useWatch";

/**
 * It is used to create a memoized function that encapsulates the result of the provided callback function and updates it only when any of the dependencies change.
 * @param callback A function that returns a value of type T.
 * @param deps An array of dependencies that the callback function depends on
 * @returns A memoized function
 */
export const usePureFunction = <T>(
  callback: () => T,
  deps: useWatchDeps,
): (() => ProxiedValue<T>) => {
  const proxiedValue = new ProxiedValue<T>();
  let outdated = true;

  const listener = () => (outdated = true);

  useWatch(listener, deps)

  return () => {
    if (outdated) {
      outdated = false;
      proxiedValue.$value = callback();
    }
    return proxiedValue;
  };
};
