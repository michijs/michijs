import { WINDOW_URL_CHANGE_EVENTS } from "../constants";

export const goTo = (url: string | URL) => {
  history.pushState(undefined, "", url);
  window.dispatchEvent(new Event(WINDOW_URL_CHANGE_EVENTS.PUSH_STATE));
};
