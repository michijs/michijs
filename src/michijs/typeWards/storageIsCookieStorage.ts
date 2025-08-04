import type { CookieStorage } from "../classes/CookieStorage";

export const storageIsCookieStorage = (
  storage,
): storage is CookieStorage => "observable" in storage;
