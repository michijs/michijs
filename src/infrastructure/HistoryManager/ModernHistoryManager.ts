import type { ObservableOrConst } from "../../domain/ports/types";
import defer * as UnproxyModule from "../../shared/utils/unproxify";
import { Observable } from "../../domain/entities/reactive/Observable";
import { handleNavigation } from "./handleNavigation";
import type { HistoryManagerPort } from "@domain";

export class ModernHistoryManager
  extends Observable<string | URL>
  implements HistoryManagerPort
{
  shouldShowUnloadPrompt?: () => boolean;
  ignoreHashes = true;
  private lastNavigationEvent?: NavigateEvent;
  constructor() {
    super();
    window.addEventListener("beforeunload", (e) => {
      const isFormEvent =
        window.navigation!.currentEntry?.url ===
          this.lastNavigationEvent?.destination.url &&
        this.lastNavigationEvent?.formData;
      if (isFormEvent || !this.shouldShowUnloadPrompt?.()) {
        return undefined;
      }
      e.preventDefault();
      return "Changes that you made may not be saved";
    });
    window.navigation!.addEventListener("navigate", (e) => {
      const previousNavigationEvent = window.navigation!.currentEntry;
      this.lastNavigationEvent = e;

      handleNavigation(e, () => {
        e.intercept({
          handler: () => {
            if (this.ignoreHashes) {
              const newIndex = e.destination.index;
              const currentIndex = previousNavigationEvent?.index || 0;
              const newUrl = e.destination.url;
              const newUrlIgnoringHash = newUrl.split("#")[0];
              const currentUrl = previousNavigationEvent?.url?.split("#")[0];
              const isGoingBackward = newIndex < currentIndex;
              // The user is not interested on hash changes when going back nor going to the same page
              if (
                e.navigationType === "traverse" &&
                isGoingBackward &&
                (newUrl.includes("#") || newUrlIgnoringHash === currentUrl)
              ) {
                this.back(document.location.origin);
                return;
              }
            }
            this.notify(e.destination.url);
          },
        });
      });
    });
  }
  canGoBack(fallbackUrl?: ObservableOrConst<string | URL>): boolean {
    if (window.navigation!.canGoBack) return window.navigation!.canGoBack;
    let matchesFallbackUrl = false;
    if (fallbackUrl) {
      const urlValue = UnproxyModule.unproxify(fallbackUrl);
      const finalUrlValue = urlValue instanceof URL ? urlValue.href : urlValue;
      matchesFallbackUrl = this.matches(finalUrlValue);
    }
    return matchesFallbackUrl;
  }

  back(fallbackUrl?: ObservableOrConst<string | URL>): void {
    if (this.canGoBack()) {
      window.navigation!.back();
      return;
    }

    if (fallbackUrl) this.replaceCurrentUrl(fallbackUrl);
  }

  // canGoForward(): boolean {
  //   return window.navigation!.canGoForward;
  // }

  // forward(): void {
  //   if (this.canGoForward()) {
  //    window.navigation!.forward();
  //     return;
  //   }
  // }

  replaceCurrentUrl(url: ObservableOrConst<string | URL>): void {
    const urlValue = UnproxyModule.unproxify(url);
    window.navigation!.navigate(urlValue, { history: "replace" });
  }

  push(url: ObservableOrConst<string | URL>): void {
    const urlValue = UnproxyModule.unproxify(url);
    window.navigation!.navigate(urlValue);
  }

  matches(url: ObservableOrConst<string>): boolean {
    const urlValue = UnproxyModule.unproxify(url);
    const p = new window.URLPattern!({
      pathname: `${urlValue.endsWith("/") ? urlValue.slice(-1, 1) : urlValue}*`,
      baseURL: location.origin,
      search: "*",
      hash: "*",
    });
    return p.test(location.href);
  }
}
