import type {
  HistoryManagerType,
  ObservableOrConst,
  Subscription,
} from "../../types";
import { handleNavigation } from "./handleNavigation";
import { unproxify } from "../../utils/unproxify";
import { Observable } from "../Observable";

export class LegacyHistoryManager
  extends Observable<string | URL>
  implements HistoryManagerType
{
  private readonly history: (string | URL)[] = [location.pathname];

  constructor(initialObservers?: Subscription<string | URL>[]) {
    super(initialObservers);
    document.addEventListener("click", (e) => {
      if (e.target instanceof HTMLAnchorElement) {
        const downloadRequest =
          e.target.download === "" ? null : e.target.download;
        const href = e.target.href;
        const canIntercept = new URL(href).origin === location.origin;
        handleNavigation(
          {
            canIntercept,
            downloadRequest,
            navigationType: "push",
          },
          () => {
            e.preventDefault();
            this.push(href);
          },
        );
      }
    });
    window.addEventListener("popstate", () => this.notify(location.href));
  }
  canGoBack(fallbackUrl?: ObservableOrConst<string | URL>): boolean {
    if (this.history.length > 0) return true;
    let matchesFallbackUrl = false;
    if (fallbackUrl) {
      const urlValue = unproxify(fallbackUrl);
      const finalUrlValue = urlValue instanceof URL ? urlValue.href : urlValue;
      matchesFallbackUrl = this.matches(finalUrlValue);
    }
    return matchesFallbackUrl;
  }

  back(fallbackUrl: ObservableOrConst<string | URL>): void {
    if (this.history.length > 0) {
      history.back();
      const url = this.history.pop()!;
      this.notify(url);
    }
    this.replaceCurrentUrl(fallbackUrl);
  }

  replaceCurrentUrl(url: ObservableOrConst<string | URL>): void {
    const urlValue = unproxify(url);
    try {
      // This will trigger an exception if its an external link string
      history.replaceState(undefined, "", urlValue);
      this.history.splice(this.history.length, 1, urlValue);
    } catch (ex) {
      console.error(ex);
      const href = urlValue instanceof URL ? urlValue.href : urlValue;
      window.location.href = href;
    }
    this.notify(urlValue);
  }

  push(url: ObservableOrConst<string | URL>): void {
    const urlValue = unproxify(url);
    try {
      // This will trigger an exception if its an string
      history.pushState(undefined, "", urlValue);
      this.history.push(urlValue);
    } catch (ex) {
      console.error(ex);
      const href = urlValue instanceof URL ? urlValue.href : urlValue;
      window.location.href = href;
    }
    this.notify(urlValue);
  }

  matches(url: ObservableOrConst<string>, flexible = false): boolean {
    const urlValue = unproxify(url);
    const urlPaths = urlValue.split("/").filter((x) => x !== "");
    let locationPaths = location.pathname.split("/").filter((x) => x !== "");
    if (flexible) {
      locationPaths = locationPaths.slice(0, urlPaths.length);
    }
    return (
      locationPaths.length === urlPaths.length &&
      !locationPaths.find(
        (locationPath, index) =>
          !urlPaths[index].startsWith(":") && locationPath !== urlPaths[index],
      )
    );
  }
}
