import type { ModernCookieStorage } from "../classes/CookieStorage/ModernCookieStorage";

export const storageIsModernCookieStorage = (
  storage,
): storage is ModernCookieStorage => "observable" in storage;
