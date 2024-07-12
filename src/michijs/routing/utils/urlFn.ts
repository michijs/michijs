import { formatToKebabCase } from "../../utils";
import { UrlFunction } from "../types";
import { setSearchParam } from "./setSearchParam";

export const urlFn = (
  property: string,
  parentRoute?: UrlFunction,
): UrlFunction => {
  return ({ searchParams, hash } = {}) => {
    const parentRouteURL = parentRoute ? new URL(parentRoute?.()) : undefined;
    const baseURL = parentRouteURL
      ? `${parentRouteURL.origin}${parentRouteURL.pathname}`
      : location.origin;
    const propertyName = formatToKebabCase(
      property.startsWith("/") ? property : `/${property}`,
    );
    const url = new URL(`${baseURL}${propertyName}`);
    if (searchParams)
      Object.entries(searchParams).forEach(([name, value]) =>
        setSearchParam(url, name, value),
      );
    if (hash?.valueOf()) url.hash = hash.valueOf();

    return url;
  };
};
