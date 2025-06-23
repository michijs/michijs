import type { HistoryManagerType } from "../../types";

let HistoryManager: HistoryManagerType;
removeTopLevelAwaits: {
  if (window.navigation && window.URLPattern)
    HistoryManager = new (
      await import("./ModernHistoryManager")
    ).ModernHistoryManager();
  else
    HistoryManager = new (
      await import("./LegacyHistoryManager")
    ).LegacyHistoryManager();
}
export { HistoryManager };
