import { LSRoute } from '../components/LSRoute';
import { h } from '../h';
import { formatToKebabCase } from '../utils/formatToKebabCase';
import { ComponentFunction, registerRoutesReturnType, Routes, UrlFunction } from './types';
import { setSearchParam } from './utils/setSearchParam';

export const urlFn = (property: string, parentRoute: UrlFunction<any, any>): UrlFunction<any, any> => {
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

export function registerRoutes<T extends Routes = Routes>(routes: T, parentRoute?: UrlFunction<any, any>): registerRoutesReturnType<T> {
  const urls = new Proxy({}, {
    get(_, property: string) {
      return urlFn(property, parentRoute);
    }
  }) as registerRoutesReturnType<T>['urls'];
  const components = new Proxy({}, {
    get(_, _property) {
      return (fn: ComponentFunction<any, any>) => {
        return fn;
      };
    }
  }) as registerRoutesReturnType<T>['components'];

  const Router: registerRoutesReturnType<T>['Router'] = (props) => {
    return <LSRoute {...props} _routes={routes} _parentRoute={parentRoute} />;
  };

  return { urls, Router, components } as registerRoutesReturnType<T>;
}