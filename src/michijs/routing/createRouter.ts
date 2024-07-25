import { Router } from "../components/Router";
import { jsx } from "../h";
import type { CreateRouterResult, UrlFunction } from "./types";
import { urlFn } from "./utils/urlFn";

export function createRouter<R extends Record<string, JSX.Element>>(
  routes: R,
  parentRoute?: UrlFunction,
) {
  const urls = new window.Proxy(
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
