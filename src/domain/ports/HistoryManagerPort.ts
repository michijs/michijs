import type { ObservablePort, ObservableOrConst } from "#ports";

export interface HistoryManagerPort extends ObservablePort<string | URL> {
  ignoreHashes?: boolean;
  canGoBack(fallbackUrl?: ObservableOrConst<string | URL>): boolean;
  back(fallbackUrl?: ObservableOrConst<string | URL>): void;
  replaceCurrentUrl(url: ObservableOrConst<string | URL>): void;
  push(url: ObservableOrConst<string | URL>): void;
  matches(url: ObservableOrConst<string>, flexible?: boolean): boolean;
  shouldShowUnloadPrompt?(): boolean;
}
