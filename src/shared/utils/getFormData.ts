export const getFormData = <T extends object>(
  formOrEvent: Event | HTMLFormElement,
): T => {
  const form = (
    formOrEvent instanceof Event ? formOrEvent.target : formOrEvent
  ) as HTMLFormElement;
  return Object.fromEntries(
    new FormData(form) as unknown as Iterable<readonly [PropertyKey, any]>,
  ) as T;
};
