import type { ObservableOrConst, Subscription, HistoryManagerType } from "../../types";
import { unproxify } from "../../utils";
import { Observable } from "../Observable";
import { handleNavigation } from "./handleNavigation";

export class ModernHistoryManager extends Observable<string | URL> implements HistoryManagerType {
  constructor(initialObservers?: Subscription<string | URL>[]) {
    super(initialObservers);
    window.navigation!.addEventListener("navigate", e => handleNavigation(e, () => {
      e.intercept({
        handler: () => {
          this.notify(e.destination.url);
        },
      });
    }));
  }
  canGoBack(fallbackUrl?: ObservableOrConst<string | URL>): boolean {
    if(window.navigation?.canGoBack)
      return window.navigation?.canGoBack
    let matchesFallbackUrl: boolean = false;
    if (fallbackUrl) {
      const urlValue = unproxify(fallbackUrl);
      const finalUrlValue = urlValue instanceof URL ? urlValue.href : urlValue;
      matchesFallbackUrl = this.matches(finalUrlValue)
    }
    return matchesFallbackUrl
  }

  back(fallbackUrl?: ObservableOrConst<string | URL>): void {
    if (this.canGoBack()) {
      navigation?.back();
    }
    if (fallbackUrl)
      this.replaceCurrentUrl(fallbackUrl);
  }

  replaceCurrentUrl(url: ObservableOrConst<string | URL>): void {
    const urlValue = unproxify(url);
    navigation?.navigate(urlValue, { history: 'replace' });
  }

  push(url: ObservableOrConst<string | URL>): void {
    const urlValue = unproxify(url);
    navigation?.navigate(urlValue);
  }

  matches(url: ObservableOrConst<string>): boolean {
    const urlValue = unproxify(url);
    const p = new window.URLPattern!({
      pathname: `${urlValue.endsWith("/") ? urlValue.slice(-1, 1) : urlValue
        }*`,
      baseURL: location.origin,
      search: "*",
      hash: "*",
    });
    return p.test(location.href);
  }
}
