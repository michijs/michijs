// esbuild includes always this in the build this if splitting = true
import type { HistoryManagerType } from "../../types";

// let HistoryManager: HistoryManagerType;
// if (window.navigation && window.URLPattern)
//   HistoryManager = new (
//     await import("./ModernHistoryManager")
//   ).ModernHistoryManager();
// else
//   HistoryManager = new (
//     await import("./LegacyHistoryManager")
//   ).LegacyHistoryManager();

// export { HistoryManager };
import { ModernHistoryManager } from './ModernHistoryManager'
import { LegacyHistoryManager } from './LegacyHistoryManager'

class HistoryManagerSingleton {
  constructor() {
    if (window.navigation && window.URLPattern)
      return new ModernHistoryManager();
    else
      return new LegacyHistoryManager();
  }
}
export const HistoryManager = new HistoryManagerSingleton() as HistoryManagerType;
