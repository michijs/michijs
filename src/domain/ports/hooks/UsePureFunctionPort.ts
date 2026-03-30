import type { UseWatchDepsPort } from "@ports";

export interface UsePureFunctionPort {
  <T>(callback: () => T, deps: UseWatchDepsPort): () => T;
}
