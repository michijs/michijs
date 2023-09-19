import { Route, UrlFunction } from "../routing/types";
import { urlFn } from "../routing/createRouter";
import { CreateOptions, ExtendableComponentWithoutChildren, FC, SingleJSXElement } from "../types";
import { HistoryManager, useComputedObserve, create } from "../..";
import { VirtualFragment } from "../classes/VirtualFragment";
import { bindObservable } from "../utils";

export type RouterProps<T> = ExtendableComponentWithoutChildren<T> & {
  routes: Record<string, Route>,
  parentRoute?: UrlFunction<any, any>,
}

export const Router = <const T = FC>({ as: asTag, routes, parentRoute, ...attrs }: RouterProps<T>, options: CreateOptions) => {
  const el = asTag ? create({
    jsxTag: asTag,
    attrs
  } as SingleJSXElement) as ChildNode & ParentNode : new VirtualFragment();

  const matchedRoute = useComputedObserve(() => {
    return Object.keys(routes).find((key) =>
      HistoryManager.matches(urlFn(key, parentRoute)().pathname, true),
    );
  }, [HistoryManager]);

  bindObservable(matchedRoute, (newMatchedRoute) => {
    // const newCache = el.childNodes.length > 0 ? Array.from(el.childNodes) : undefined
    el.textContent = '';

    if (newMatchedRoute) {
      const { title, component } = routes[newMatchedRoute];
      if (title)
        document.title = title;

      // TODO: add search params and hash

      el.append(create(component, options))
    }
  })

  return el.valueOf();
}
