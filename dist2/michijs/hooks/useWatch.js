/**
 * @typedef {import('../types').useWatchDeps} useWatchDeps
 */

/**
 * A simple mechanism for watching dependencies and invoking a callback when any of them change.
 * @template T
 * @param {() => T} callback A function that returns a value of type T. This is the function that will be invoked when any dependency changes.
 * @param {useWatchDeps} [deps] An array of dependencies to watch for changes.
 */
export function useWatch(callback, deps) {
  deps?.forEach((x) => x?.subscribe?.(callback));
}
