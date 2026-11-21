// `#cookie-storage`: CookieStorage with the existing cookies read before the app starts.
import { getCookieValue, mainCookieStorage } from "./cookieCache";

removeTopLevelAwaits: {
  (await cookieStore.getAll()).forEach((x) => {
    if (x.name) mainCookieStorage.set(x.name, getCookieValue(x.value));
  });
}

export { CookieStorage } from "./CookieStorage";
