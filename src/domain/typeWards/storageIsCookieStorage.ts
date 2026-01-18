import type { CookieStorage } from "../entities/CookieStorage";

export const storageIsCookieStorage = (storage): storage is CookieStorage =>
  "observable" in storage;
