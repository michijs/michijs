import { Route, UrlFunction } from "../routing/types";
import { urlFn } from "../routing/createRouter";
import { CreateOptions, ExtendableComponentWithoutChildren, FC, SingleJSXElement } from "../types";
import { UrlObservable, useComputedObserve, create } from "../..";
import { VirtualFragment } from "../classes/VirtualFragment";
import { bindObservable } from "../hooks/bindObservable";

export type RouterProps<T> = ExtendableComponentWithoutChildren<T> & {
  routes: Record<string, Route>,
  parentRoute?: UrlFunction<any, any>,
}

export const Router = <const T = FC>({ as: asTag, routes, parentRoute, ...attrs }: RouterProps<T>, options: CreateOptions) => {
  const el = asTag ? create({
    tag: asTag,
    attrs
  } as SingleJSXElement) as ChildNode & ParentNode : new VirtualFragment();

  const matchedRoute = useComputedObserve(() => {
    if (routes) {
      const routeFound = Object.keys(routes).find((key) =>
        UrlObservable.matches(urlFn(key, parentRoute)().pathname, true),
      );
      if (routeFound) return routes[routeFound];
    }
    return null;
  }, [UrlObservable]);

  bindObservable(matchedRoute, (newMatchedRoute) => {
    // const newCache = el.childNodes.length > 0 ? Array.from(el.childNodes) : undefined
    el.textContent = '';

    if (newMatchedRoute?.$value) {
      const { title, component } = newMatchedRoute.$value;
      if (title)
        document.title = title;

        // TODO: add search params and hash

      el.append(create(component, options))
    }
  })
  return el;
}
