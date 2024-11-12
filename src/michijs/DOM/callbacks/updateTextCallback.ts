export const updateTextCallback = (newValue: unknown, el: Text) => (el.nodeValue =
  (typeof newValue === "object"
    ? JSON.stringify(newValue)
    : newValue?.toString()) ?? "");
