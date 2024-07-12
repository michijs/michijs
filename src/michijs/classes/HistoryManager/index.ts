import { HistoryManagerType } from "../../types";
import { ModernHistoryManager } from "./ModernHistoryManager";
import { LegacyHistoryManager } from "./LegacyHistoryManager";

// Doesnt work with esbuild
const getHistoryManager = async (): Promise<HistoryManagerType> => {
  if (window.navigation && window.URLPattern) {
    // const classToUse = (await import('./ModernHistoryManager')).ModernHistoryManager
    // return new classToUse();
    return new ModernHistoryManager();
  } else {
    return new LegacyHistoryManager();
    // const classToUse = (await import('./LegacyHistoryManager')).LegacyHistoryManager
    // return new classToUse();
  }
};

export const HistoryManager = await getHistoryManager();
