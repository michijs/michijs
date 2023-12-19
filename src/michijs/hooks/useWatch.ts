export type useWatchDeps = any[];

export function useWatch<T>(
  callback: () => T,
  deps: useWatchDeps,
): void {
  deps.forEach((x) => x?.subscribe?.(callback));
}
