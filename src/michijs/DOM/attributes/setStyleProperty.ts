import { formatToKebabCase } from "../../utils";

export const setStyleProperty = (
  element: HTMLElement,
  key: string,
  value: unknown,
) => {
  if (value !== undefined && value !== null)
    element.style.setProperty(formatToKebabCase(key), value.toString());
  else element.style.removeProperty(formatToKebabCase(key));
};
