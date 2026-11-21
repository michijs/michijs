import { ModernHistoryManager } from "./ModernHistoryManager";

/**
 * `#history-manager` for builds with the `michijs-no-polyfills` condition: always the
 * Navigation API one, without the History API fallback nor top-level await.
 */
export const HistoryManager = new ModernHistoryManager();
