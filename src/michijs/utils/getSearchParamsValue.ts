import type { AnyObject } from "../types";

export const getSearchParamsValue = <T extends AnyObject = AnyObject>(search: string = location.search): T => {
  const initialSearchParamsValue: AnyObject = {};
  new URLSearchParams(search).forEach((value, key) => {
    try {
      initialSearchParamsValue[key] = JSON.parse(value);
    } catch {
      initialSearchParamsValue[key] = value;
    }
  });
  return initialSearchParamsValue as T;
};
