import type { Hash, SearchParams } from "../types";
import { normalizeURL } from "./normalizeURL";
import { setSearchParam } from "./setSearchParam";

export const createURL = (
  input: string,
  options?: {
    baseURL?: string | URL;
    searchParams?: SearchParams;
    hash?: Hash;
  },
) => {
  const url = new URL(
    encodeURI(normalizeURL(decodeURIComponent(input))),
    options?.baseURL,
  );
  if (options?.searchParams)
    Object.entries(options.searchParams).forEach(([name, value]) =>
      setSearchParam(url, name, value),
    );
  const hashValue = options?.hash?.valueOf();
  if (hashValue) url.hash = hashValue;
  return url;
};
