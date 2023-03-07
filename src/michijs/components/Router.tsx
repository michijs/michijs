import { createCustomElement } from '../customElements/createCustomElement';
import { sharedUrlObservable } from '../routing/utils/sharedUrlObservable';
import { AsyncRoute, Route, SyncRoute, UrlFunction } from '../routing/types';
import { hash, searchParams } from '../routing';
import { urlFn } from '../routing/createRouter';
import { h } from '../h';

export const Router = createCustomElement('michi-router', {
  attributes: {
    currentComponent: null as JSX.Element,
    routes: undefined as Record<string, Route> | undefined,
    parentRoute: undefined as UrlFunction<any, any> | undefined,
  },
  lifecycle: {
    willMount() {
      this.onChangeURL();
    },
  },
  methods: {
    matches(url: string, flexible: boolean = false) {
      const urlPaths = url.split('/').filter((x) => x !== '');
      let locationPaths = location.pathname.split('/').filter((x) => x !== '');
      if (flexible) {
        locationPaths = locationPaths.slice(0, urlPaths.length);
      }
      return (
        locationPaths.length === urlPaths.length &&
        !locationPaths.find(
          (locationPath, index) =>
            !urlPaths[index].startsWith(':') &&
            locationPath !== urlPaths[index],
        )
      );
    },
    getMatchedRoute() {
      if (this.routes) {
        const routeFound = Object.keys(this.routes).find((key) =>
          this.matches(urlFn(key, this.parentRoute)().pathname, true),
        );
        if (routeFound) return this.routes[routeFound];
      }
      return null;
    },
    processComponent(component?: JSX.Element) {
      if (
        component &&
        typeof component === 'object' &&
        'tag' in component &&
        typeof component.tag === 'function'
      ) {
        return {
          ...component,
          attrs: {
            ...component.attrs,
            searchParams,
            hash,
          },
        };
      }
      return component;
    },
    onChangeURL() {
      const matchedRoute = this.getMatchedRoute();
      if (matchedRoute) {
        const { title, component, promise, loadingComponent } =
          matchedRoute as SyncRoute & AsyncRoute; //& RedirectRoute

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

        if (component) updateCurrentComponent(component);
        else {
          if (loadingComponent) {
            updateCurrentComponent(loadingComponent);
          }
          promise().then((Component) => {
            updateCurrentComponent(<Component />);
          });
        }
        // }
      } else this.currentComponent = null;
    },
  },
  observe: {
    sharedUrlObservable() {
      this.onChangeURL();
    },
  },
  subscribeTo: {
    sharedUrlObservable,
  },
  render() {
    return this.processComponent(this.currentComponent);
  },
});
