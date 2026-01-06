import type { CustomNavigateEvent } from "../../types";

export function handleNavigation(
  event: CustomNavigateEvent,
  interceptCallback: () => void,
) {
  if (
    !event.canIntercept ||
    event.downloadRequest ||
    event.formData ||
    event.navigationType === "reload"
  ) {
    return;
  }
  interceptCallback();
}
