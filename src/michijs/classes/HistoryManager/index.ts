import type { HistoryManagerType } from "../../types";
import { ModernHistoryManager } from "./ModernHistoryManager";
import { LegacyHistoryManager } from "./LegacyHistoryManager";

let HistoryManager: HistoryManagerType;
// Rollup has issues with this
if (window.navigation && window.URLPattern) {
  HistoryManager = new ModernHistoryManager();
  // HistoryManager = new (
  //   await import("./ModernHistoryManager")
  // ).ModernHistoryManager();
} else {
  HistoryManager = new LegacyHistoryManager();
  // HistoryManager = new (
  //   await import("./LegacyHistoryManager")
  // ).LegacyHistoryManager();
}

export { HistoryManager };
