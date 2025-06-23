import type { CookieStorageConstructor } from "../../types";

let CookieStorage: { new (props: CookieStorageConstructor): Storage };

removeTopLevelAwaits: {
  if ("cookieStore" in window)
    CookieStorage = (await import("./ModernCookieStorage")).ModernCookieStorage;
  else
    CookieStorage = (await import("./LegacyCookieStorage")).LegacyCookieStorage;
}

export { CookieStorage };
