export const setStyleProperty = (
  element: HTMLElement,
  key: string,
  value: unknown,
) => {
  if (value !== undefined && value !== null)
    element.style.setProperty(key, value.toString());
  else element.style.removeProperty(key);
};
