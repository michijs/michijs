import { createCustomElement } from '../customElements/createCustomElement';
import { h } from '../h';
import { sharedUrlObservable } from '../routing/utils/sharedUrlObservable';
import { AsyncRoute, ComponentFunction, Routes, SyncRoute, UrlFunction } from '../routing/types';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
import { FunctionJSXElement } from '../types';
import { hash, searchParams } from '../routing';
import { urlFn } from '../routing/registerRoutes';

export const LSRoute = createCustomElement('ls-route', {
  attributes: {
    currentComponent: <></> as JSX.Element,
    routes: undefined as Routes,
    parentRoute: undefined as UrlFunction<any, any>,
  },
  lifecycle: {
    willMount() {
      this.onChangeURL();
    },
  },
  methods: {
    matches(url: string, flexible: boolean = false) {
      const urlPaths = url.split('/').filter(x => x !== '');
      let locationPaths = location.pathname.split('/').filter(x => x !== '');
      if (flexible) {
        locationPaths = locationPaths.slice(0, urlPaths.length);
      }
      return locationPaths.length === urlPaths.length && !locationPaths.find((locationPath, index) => !urlPaths[index].startsWith(':') && locationPath !== urlPaths[index]);
    },
    getMatchedRoute() {
      return this.routes[Object.keys(this.routes).find(key => this.matches(urlFn(key, this.parentRoute)().pathname, true))];
    },
    processComponent(component: JSX.Element) {
      const [type, jsxElementTyped] = getJSXElementType(component);
      let result = jsxElementTyped<FunctionJSXElement>();
      if (type === JSXElementType.FUNCTION) {
        result = {
          ...result,
          attrs: {
            ...result.attrs,
            searchParams,
            hash
          }
        };
      }
      return result;
    },
    onChangeURL() {
      const matchedRoute = this.getMatchedRoute();
      if (matchedRoute) {
        const { title, component, promise, loadingComponent, key = 'default' } = matchedRoute as SyncRoute & AsyncRoute;//& RedirectRoute

        // if (redirectTo) {
        //   goTo(redirectTo());
        // } else {
        if (title) {
          document.title = title;
        }
        const newLocationHref = location.href;

        const updateCurrentComponent = (component: JSX.Element) => {
          const currentLocationHref = location.href;
          //Avoids bugs with route changes
          if (currentLocationHref === newLocationHref) {
            this.currentComponent = component;
          }
        };

        if (component) {
          updateCurrentComponent(component);
        } else {
          if (loadingComponent) {
            updateCurrentComponent(loadingComponent);
          }
          promise().then((result: { [key: string]: ComponentFunction<any, any> }) => {
            const Component = result[key];
            updateCurrentComponent(<Component />);
          });
        }
        // }
      } else {
        this.currentComponent = <></>;
      }
    }
  },
  observe: {
    sharedUrlObservable() {
      this.onChangeURL();
    }
  },
  subscribeTo: {
    sharedUrlObservable
  },
  render() {
    return this.processComponent(this.currentComponent);
  }
});