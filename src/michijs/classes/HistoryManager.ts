import { ObserverCallback } from "../types";
import { Observable } from "./Observable";


class HistoryManagerSingleton extends Observable<string | URL>{
  readonly history: (string | URL)[] = [location.pathname];

  constructor(initialObservers?: ObserverCallback<string | URL>[]) {
    super(initialObservers);
    window.addEventListener("popstate", () => {
      const url = this.history.pop();
      this.notify(url)
    });
  }

  back(fallbackUrl: string | URL) {
    if (this.history.length > 0) {
      history.back();
      const url = this.history.pop()
      this.notify(url);
      return url;
    } else
      return this.replaceCurrentUrl(fallbackUrl);
  }

  replaceCurrentUrl(url: string | URL) {
    try {
      // This will trigger an exception if its an external link string
      history.replaceState(undefined, "", url);
      this.history.splice(this.history.length, 1, url)
    } catch(ex) {
      console.error(ex)
      const href = typeof url === "object" && "href" in url ? url.href : url;
      window.location.href = href;
    }
    this.notify(url)
  }

  push(url: string | URL) {
    try {
      // This will trigger an exception if its an string
      history.pushState(undefined, "", url);
      this.history.push(url)
    } catch(ex) {
      console.error(ex)
      const href = typeof url === "object" && "href" in url ? url.href : url;
      window.location.href = href;
    }
    this.notify(url)
  }

  matches(url: string, flexible = false) {
    if(window.URLPattern){
      const p = new window.URLPattern({
        pathname: url,
        baseURL: location.origin,
        search: "*",
        hash: "*",
      })
      return p.test(location.href);
    }
    const urlPaths = url.split("/").filter((x) => x !== "");
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

export const HistoryManager = new HistoryManagerSingleton()