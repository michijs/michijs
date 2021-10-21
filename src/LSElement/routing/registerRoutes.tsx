import { LSRoute } from '../components/LSRoute';
import { h } from '../h';
import { observable } from '../hooks';
import { FunctionJSXElement } from '../types';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
import { formatToKebabCase } from '../utils/formatToKebabCase';
import { hash } from './hash';
import { searchParams } from './searchParams';
import { AsyncRoute, ComponentFunction, registerRoutesReturnType, Routes, SyncRoute, UrlFunction } from './types';
import { setSearchParam } from './utils/setSearchParam';
import { sharedUrlObservable } from './utils/sharedUrlObservable';

const matches = (url: string, flexible: boolean = false) => {
  const urlPaths = url.split('/').filter(x => x !== '');
  let locationPaths = location.pathname.split('/').filter(x => x !== '');
  if (flexible) {
    locationPaths = locationPaths.slice(0, urlPaths.length);
  }
  return locationPaths.length === urlPaths.length && !locationPaths.find((locationPath, index) => !urlPaths[index].startsWith(':') && locationPath !== urlPaths[index]);
};

const getMatchedRoute = (routes: Routes, urls: registerRoutesReturnType<any>['urls']) => {
  return routes[Object.keys(routes).find(key => matches(urls[key]().pathname, true))];
};

export function registerRoutes<T extends Routes = Routes>(routes: T, parentRoute?: UrlFunction<any, any>): registerRoutesReturnType<T> {
  const urls = new Proxy({}, {
    get(_, property: string) {
      const urlFn: UrlFunction<any, any> = ({ searchParams, hash } = {}) => {
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
      return urlFn;
    }
  }) as registerRoutesReturnType<T>['urls'];
  const components = new Proxy({}, {
    get(_, _property) {
      const componentFn = (fn: ComponentFunction<any, any>) => {
        return fn;
      };
      return componentFn;
    }
  }) as registerRoutesReturnType<T>['components'];

  const routeObservable = observable<JSX.Element>();
  const notifyNewCurrentComponent = async () => {
    const matchedRoute = getMatchedRoute(routes, urls);
    if (matchedRoute) {
      const { title, component, promise, loadingComponent, key = 'default' } = matchedRoute as SyncRoute & AsyncRoute;//& RedirectRoute

      // if (redirectTo) {
      //   goTo(redirectTo());
      // } else {
      if (title) {
        document.title = title;
      }
      const newLocationHref = location.href;

      const processComponent = (component: JSX.Element) => {
        const [type, jsxElementTyped] = getJSXElementType(component);
        const result = jsxElementTyped<FunctionJSXElement>();
        if (type === JSXElementType.FUNCTION) {
          result.attrs = {
            ...result.attrs,
            searchParams,
            hash
          };
        }
        return result;
      };
      const notify = (component: JSX.Element) => {
        const currentLocationHref = location.href;
        //Avoids bugs with route changes
        if (currentLocationHref === newLocationHref) {
          routeObservable.notify(processComponent(component));
        }
      };

      if (component) {
        notify(component);
      } else {
        if (loadingComponent) {
          notify(loadingComponent);
        }
        promise().then((result: { [key: string]: ComponentFunction<any, any> }) => {
          const Component = result[key];
          notify(<Component />);
        });
      }
      // }
    } else {
      routeObservable.notify(<></>);
    }
  };

  sharedUrlObservable.subscribe(() => {
    notifyNewCurrentComponent();
  });

  const Router: registerRoutesReturnType<T>['Router'] = (props) => {
    return <LSRoute {...props} _subscribedRoute={routeObservable} onreadytorender={notifyNewCurrentComponent} />;
  };

  return { urls, Router, components } as registerRoutesReturnType<T>;
}