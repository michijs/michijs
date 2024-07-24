import type { AnyObject } from "../types";

export const getSearchParamsValue = <
  T extends AnyObject = Record<string, unknown>,
>(): T => {
  const initialSearchParamsValue: Record<string, unknown> = {};
  new URLSearchParams(location.search).forEach((value, key) => {
    try {
      initialSearchParamsValue[key] = JSON.parse(value);
    } catch {
      initialSearchParamsValue[key] = value;
    }
  });
  return initialSearchParamsValue as T;
};
