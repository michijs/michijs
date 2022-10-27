import { WINDOW_URL_CHANGE_EVENTS } from '../constants';

export const goTo = (url: string | URL) => {
  window.history.pushState(undefined, undefined, url); window.dispatchEvent(new Event(WINDOW_URL_CHANGE_EVENTS.PUSH_STATE));
};