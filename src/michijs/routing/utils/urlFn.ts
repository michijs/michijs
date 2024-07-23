import { formatToKebabCase } from "../../utils";
import type { UrlFunction } from "../types";
import { createURL } from "./createURL";

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

    return createURL(`${baseURL}${propertyName}`, {
      searchParams,
      hash,
    });
  };
};
