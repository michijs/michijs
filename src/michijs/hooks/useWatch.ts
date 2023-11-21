import { CompatibleObservableLike } from "../types";

export type useWatchDeps = Partial<CompatibleObservableLike<any>>[];

export function useWatch<T>(
  callback: () => T,
  deps: Partial<CompatibleObservableLike<any>>[],
): void {
  deps.forEach((x) => x.subscribe?.(callback));
}
