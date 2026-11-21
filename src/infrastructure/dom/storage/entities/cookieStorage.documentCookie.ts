// `#cookie-storage` for builds with the `michijs-no-preloaded-with-cookie-storage`
// condition: the existing cookies are read synchronously from document.cookie (the same
// ones cookieStore exposes) instead of with a top-level await on cookieStore.getAll().
import { getCookieValue, mainCookieStorage } from "./cookieCache";

for (const pair of document.cookie ? document.cookie.split("; ") : []) {
  const separator = pair.indexOf("=");
  const name = separator === -1 ? pair : pair.slice(0, separator);
  if (name)
    mainCookieStorage.set(
      name,
      getCookieValue(separator === -1 ? "" : pair.slice(separator + 1)),
    );
}

export { CookieStorage } from "./CookieStorage";
