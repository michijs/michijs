import type { HistoryManagerType } from "../../types";
import { ModernHistoryManager } from "./ModernHistoryManager";
import { LegacyHistoryManager } from "./LegacyHistoryManager";

let HistoryManager: HistoryManagerType;
if (window.navigation && window.URLPattern) {
  HistoryManager = new (
    await import("./ModernHistoryManager")
  ).ModernHistoryManager();
} else {
  HistoryManager = new (
    await import("./LegacyHistoryManager")
  ).LegacyHistoryManager();
}

export { HistoryManager };
