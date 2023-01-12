import { Router } from '../components/Router';
import { h } from '../h';
import { formatToKebabCase } from '../utils/formatToKebabCase';
import { PagesFunction, CreateRouterResult, UrlFunction, CreateRouterSearchParamsAndHash, Route } from './types';
import { setSearchParam } from './utils/setSearchParam';

export const urlFn = (property: string, parentRoute?: UrlFunction<any, any>): UrlFunction<any, any> => {
  return ({ searchParams, hash } = {}) => {
    const parentRouteURL = parentRoute?.();
    const baseURL = parentRouteURL ? `${parentRouteURL.origin}${parentRouteURL.pathname}` : location.origin;
    const propertyName = formatToKebabCase(property.startsWith('/') ? property : `/${property}`);
    const url = new URL(`${baseURL}${propertyName}`);
    if (searchParams)
      Object.entries(searchParams).forEach(([name, value]) => setSearchParam(url, name, value));
    if (hash)
      url.hash = hash;

    return url;
  };
};

export function createRouter<T extends CreateRouterSearchParamsAndHash>() {
  return function <R extends Record<string, Route>>(routes: R, parentRoute?: UrlFunction<any, any>) {
    const urls = new Proxy({}, {
      get(_, property: string) {
        return urlFn(property, parentRoute);
      }
    });
    const pages = new Proxy({}, {
      get(_, _property) {
        return (fn: PagesFunction<any, any>) => {
          return fn;
        };
      }
    });

    const RouterProxy: CreateRouterResult<T, R>['Router'] = (props) => {
      return <Router {...props} _routes={routes} _parentRoute={parentRoute} />;
    };

    return { urls, Router: RouterProxy, pages } as CreateRouterResult<T, R>;
  }
}