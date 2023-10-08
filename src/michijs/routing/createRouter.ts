import { Router } from "../components/Router";
import { jsx } from "../h";
import { formatToKebabCase } from "../utils/formatToKebabCase";
import { CreateRouterResult, UrlFunction } from "./types";
import { setSearchParam } from "./utils/setSearchParam";

export const urlFn = (
  property: string,
  parentRoute?: UrlFunction,
): UrlFunction => {
  return ({ searchParams, hash } = {}) => {
    const parentRouteURL = parentRoute?.();
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

export function createRouter<R extends Record<string, JSX.Element>>(
  routes: R,
  parentRoute?: UrlFunction,
) {
  const urls = new Proxy(
    {},
    {
      get(_, property: string) {
        return urlFn(property, parentRoute);
      },
    },
  );

  const RouterProxy: CreateRouterResult<R>[1] = (props) =>
    jsx(Router, {
      ...props,
      routes,
      parentRoute,
    });

  return [urls, RouterProxy] as CreateRouterResult<R>;
}
