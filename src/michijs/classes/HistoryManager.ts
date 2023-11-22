import { ObservableProps, Subscription } from "../types";
import { unproxify } from "../utils";
import { Observable } from "./Observable";

class HistoryManagerSingleton extends Observable<string | URL> {
  readonly history: (string | URL)[] = [location.pathname];

  constructor(initialObservers?: Subscription<string | URL>[]) {
    super(initialObservers);
    window.addEventListener("popstate", () => this.notify(location.href));
  }

  back(fallbackUrl: ObservableProps<string | URL>) {
    if (this.history.length > 0) {
      history.back();
      const url = this.history.pop();
      this.notify(url);
      return url;
    } else return this.replaceCurrentUrl(fallbackUrl);
  }

  replaceCurrentUrl(url: ObservableProps<string | URL>) {
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

  push(url: ObservableProps<string | URL>) {
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

  matches(url: ObservableProps<string>, flexible = false) {
    const urlValue = url.valueOf();
    if (window.URLPattern) {
      const p = new window.URLPattern({
        pathname: `${urlValue}*`,
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

export const HistoryManager = new HistoryManagerSingleton();
