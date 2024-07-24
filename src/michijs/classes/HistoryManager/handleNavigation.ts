interface CustomNavigateEvent
  extends Pick<
      NavigateEvent,
      "downloadRequest" | "canIntercept" | "navigationType"
    >,
    Partial<Pick<NavigateEvent, "formData">> {}

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
