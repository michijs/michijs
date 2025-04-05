import type { HistoryManagerType } from "../../types";

let HistoryManager: Promise<HistoryManagerType>;
if (window.navigation && window.URLPattern)
  HistoryManager = import("./ModernHistoryManager").then(({ ModernHistoryManager }) => new ModernHistoryManager())
else
  HistoryManager = import("./LegacyHistoryManager").then(({ LegacyHistoryManager }) => new LegacyHistoryManager())

export { HistoryManager };
