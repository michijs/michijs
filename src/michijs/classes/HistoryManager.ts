import type { ObservableOrConst, Subscription } from "../types";
import { unproxify } from "../utils";
import { Observable } from "./Observable";
import "navigation-api-types";

class HistoryManagerSingleton extends Observable<string | URL> {
  readonly history: (string | URL)[] = [location.pathname];

  constructor(initialObservers?: Subscription<string | URL>[]) {
    super(initialObservers);
    if (window.navigation) {
      window.navigation.addEventListener("navigate", this.handleNavigation);
    } else {
      document.addEventListener("click", (e) => {
        if (e.target instanceof HTMLAnchorElement) this.handleNavigation(e);
      });
      window.addEventListener("popstate", () => this.notify(location.href));
    }
  }

  private handleNavigation({
    canIntercept,
    downloadRequest,
    target,
    formData,
    destination,
    preventDefault,
    navigationType = "push",
    intercept,
  }: Partial<NavigateEvent> & Event) {
    const typedTarget = target as HTMLAnchorElement;
    downloadRequest ??=
      typedTarget.download === "" ? null : typedTarget.download;
    const href = destination?.url ?? typedTarget.href;
    canIntercept ??= new URL(href).origin === location.origin;
    if (!canIntercept || downloadRequest !== null || formData) {
      return;
    }
    // const finalNavigationType = typedTarget.getAttribute('navigation-type') ?? navigationType;

    if (intercept) {
      intercept({
        handler: async () => {
          this.notify(href);
        },
      });
    } else {
      preventDefault();
      this.history.push(href);
    }
  }

  back(fallbackUrl: ObservableOrConst<string | URL>): string | void | URL {
    if (this.history.length > 0) {
      history.back();
      const url = this.history.pop()!;
      this.notify(url);
      return url;
    }
    return this.replaceCurrentUrl(fallbackUrl);
  }

  replaceCurrentUrl(url: ObservableOrConst<string | URL>): void {
    const urlValue = unproxify(url);
    try {
      // This will trigger an exception if its an external link string
      history.replaceState(undefined, "", urlValue);
      this.history.splice(this.history.length, 1, urlValue);
    } catch (ex) {
      console.error(ex);
      const href =
        typeof urlValue === "object" && "href" in urlValue
          ? urlValue.href
          : urlValue;
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
      const href =
        typeof urlValue === "object" && "href" in urlValue
          ? urlValue.href
          : urlValue;
      window.location.href = href;
    }
    this.notify(urlValue);
  }

  matches(url: ObservableOrConst<string>, flexible = false): boolean {
    const urlValue = unproxify(url);
    if (window.URLPattern) {
      const p = new window.URLPattern({
        pathname: `${
          urlValue.endsWith("/") ? urlValue.slice(-1, 1) : urlValue
        }*`,
        baseURL: location.origin,
        search: "*",
        hash: "*",
      });
      return p.test(location.href);
    }
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

export const HistoryManager: HistoryManagerSingleton =
  new HistoryManagerSingleton();
