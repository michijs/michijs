import { formatToKebabCase } from "@shared";
import type { UrlFunction } from "../types";
import { createURL } from "./createURL";

export const urlFn = (
  property: string,
  parentRoute?: UrlFunction,
): UrlFunction => {
  return ({ searchParams, hash, params } = {}) => {
    const parentRouteURL = parentRoute ? new URL(parentRoute()) : undefined;
    let baseURL = parentRouteURL
      ? `${parentRouteURL.origin}${parentRouteURL.pathname}`
      : location.origin;
    const propertyName = formatToKebabCase(
      property.startsWith("/") ? property : `/${property}`,
    );

    if (params)
      for (const [key, value] of Object.entries(params))
        baseURL = baseURL.replaceAll(`:${key}`, encodeURIComponent(value));

    return createURL(`${baseURL}${propertyName}`, {
      searchParams,
      hash,
    });
  };
};
