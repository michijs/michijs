import { isNil } from "../../utils";

export const setStyleProperty = (
  element: HTMLElement,
  key: string,
  value: unknown,
) => {
  if (!isNil(value))
    element.style.setProperty(key, (value as NonNullable<unknown>).toString());
  else element.style.removeProperty(key);
};
