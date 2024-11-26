import type { useWatchDeps } from "../types";

/**
 * A simple mechanism for watching dependencies and invoking a callback when any of them change.
 * @param callback A function that returns a value of type T. This is the function that will be invoked when any dependency changes.
 * @param deps An array of dependencies to watch for changes.
 */
export function useWatch<T>(callback: () => T, deps?: useWatchDeps): void {
  if (deps) for (const x of deps) x?.subscribe?.(callback);
}
