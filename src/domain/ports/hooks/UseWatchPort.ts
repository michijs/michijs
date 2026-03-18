import type { UseWatchDepsPort } from "./UseWatchDepsPort";

export interface UseWatchPort {
  <T>(callback: () => T, deps?: UseWatchDepsPort): void;
}