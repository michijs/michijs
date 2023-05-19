import { WINDOW_URL_CHANGE_EVENTS } from "../constants";
import { observable } from "./observable";

export function urlObservable() {
  const { notify, ...observableProps } = observable<Event>();

  window.addEventListener(WINDOW_URL_CHANGE_EVENTS.PUSH_STATE, notify);
  window.addEventListener("popstate", notify);
  const matches = (url: string, flexible: boolean = false) => {
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
  };

  return { ...observableProps, matches };
}
