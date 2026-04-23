export const getFormData = <T extends object>(
  formOrEvent: { target: EventTarget | null } | HTMLFormElement,
): T => {
  const form = (
    "target" in formOrEvent && !(formOrEvent instanceof HTMLFormElement)
      ? formOrEvent.target
      : formOrEvent
  ) as HTMLFormElement;
  return Object.fromEntries(
    new FormData(form) as unknown as Iterable<readonly [PropertyKey, any]>,
  ) as T;
};
