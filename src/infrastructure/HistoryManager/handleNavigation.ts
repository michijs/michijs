import type { CustomNavigateEvent } from "@shared";

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
