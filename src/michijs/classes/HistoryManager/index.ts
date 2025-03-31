import type { HistoryManagerType } from "../../types";
import { LegacyHistoryManager } from "./LegacyHistoryManager";
import { ModernHistoryManager } from "./ModernHistoryManager";

let HistoryManager: HistoryManagerType;
if (window.navigation && window.URLPattern)
  HistoryManager = new ModernHistoryManager();
// HistoryManager = new (
//   await import("./ModernHistoryManager")
// ).ModernHistoryManager();
else HistoryManager = new LegacyHistoryManager();
// HistoryManager = new (
//   await import("./LegacyHistoryManager")
// ).LegacyHistoryManager();

export { HistoryManager };
