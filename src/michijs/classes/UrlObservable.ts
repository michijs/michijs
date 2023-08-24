import { WINDOW_URL_CHANGE_EVENTS } from "../constants";
import { ObserverCallback } from "../types";
import { Observable } from "./Observable";

class UrlObservableSingleton extends Observable<Event | PopStateEvent> {
  constructor(initialObservers?: ObserverCallback<Event | PopStateEvent>[]) {
    super(initialObservers);
    window.addEventListener(WINDOW_URL_CHANGE_EVENTS.PUSH_STATE, this.notify);
    window.addEventListener("popstate", this.notify);
  }

  matches(url: string, flexible = false) {
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

export const UrlObservable = new UrlObservableSingleton();
