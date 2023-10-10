import { UrlFunction } from "../routing/types";
import { urlFn } from "../routing/createRouter";
import {
  CreateOptions,
  ExtendableComponentWithoutChildren,
  FC,
  SingleJSXElement,
} from "../types";
import { HistoryManager, useComputedObserve, create } from "../..";
import { VirtualFragment } from "../classes/VirtualFragment";
import { bindObservable } from "../utils";

export type RouterProps<T> = ExtendableComponentWithoutChildren<T> & {
  routes: Record<string, JSX.Element>;
  parentRoute?: UrlFunction<any, any>;
};

export const Router = <const T = FC>(
  { as: asTag, routes, parentRoute, ...attrs }: RouterProps<T>,
  options: CreateOptions,
) => {
  const el = asTag
    ? (create({
      jsxTag: asTag,
      attrs,
    } as unknown as SingleJSXElement) as ChildNode & ParentNode)
    : new VirtualFragment();
  const cache: Record<string, DocumentFragment> = {};

  const matchedRoute = useComputedObserve(() => {
    return Object.keys(routes).find((key) =>
      HistoryManager.matches(urlFn(key, parentRoute)().pathname, true),
    );
  }, [HistoryManager]);
  let currentRoute: string | undefined = matchedRoute.valueOf();

  bindObservable(matchedRoute, (newMatchedRoute) => {
    const newCache = Array.from(el.childNodes);
    if (currentRoute) {
      const fragment = new DocumentFragment();
      fragment.append(...newCache)
      cache[currentRoute] = fragment;
    }

    if (newMatchedRoute) {
      if (cache[newMatchedRoute]) el.replaceChildren(cache[newMatchedRoute]);
      else {
        const component = routes[newMatchedRoute];
        el.replaceChildren(create(component, options));
      }
    }
    currentRoute = newMatchedRoute;
  });

  return el.valueOf() as Node;
};
