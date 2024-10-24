import { isNil } from "../../utils/isNil";

export const setStyleProperty = (
  element: HTMLElement,
  key: string,
  value: unknown,
): void => {
  if (!isNil(value))
    element.style.setProperty(key, (value as NonNullable<unknown>).toString());
  else element.style.removeProperty(key);
};
