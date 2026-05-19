export const getFormData = <T extends object>(
  formOrEvent: { target: EventTarget | null } | HTMLFormElement,
): T => {
  const form = (
    "target" in formOrEvent && !(formOrEvent instanceof HTMLFormElement)
      ? formOrEvent.target
      : formOrEvent
  ) as HTMLFormElement;
  const flat = Object.fromEntries(new FormData(form));

  return Object.entries(flat).reduce((acc, [key, value]) => {
    const parts = key.split(".");
    parts.reduce((obj, part, i) => {
      if (i === parts.length - 1) {
        obj[part] = value;
      } else {
        obj[part] ??= {};
      }
      return obj[part];
    }, acc);
    return acc;
  }, {}) as T;
};
