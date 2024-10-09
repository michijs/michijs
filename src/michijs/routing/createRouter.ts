import { Router } from "../components/Router";
import { jsx } from "../h";
import type { CreateRouterResult, UrlFunction } from "./types";
import { urlFn } from "./utils/urlFn";

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

  const RouterProxy = (props) =>
    jsx(Router, {
      ...props,
      routes,
      parentRoute,
    });

  return [urls, RouterProxy] as unknown as CreateRouterResult<R>;
}
