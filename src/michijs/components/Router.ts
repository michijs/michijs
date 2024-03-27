import type { UrlFunction } from "../routing/types";
import { urlFn } from "../routing/createRouter";
import type {
  CreateOptions,
  ExtendableComponentWithoutChildren,
  CreateFCResult,
  SingleJSXElement,
} from "../types";
import { HistoryManager, useComputedObserve, create } from "../..";
import { VirtualFragment } from "../classes/VirtualFragment";
import { bindObservable } from "../utils";

export type RouterProps<T> = ExtendableComponentWithoutChildren<T> & {
  routes: Record<string, JSX.Element>;
  parentRoute?: UrlFunction<any, any>;
  /** Allows to caché then / else components. */
  enableCache?: boolean;
};

export const Router = <const T = CreateFCResult>(
  { as: asTag, routes, parentRoute, enableCache, ...attrs }: RouterProps<T>,
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
    const newCache = el.childNodes.length
      ? Array.from(el.childNodes)
      : undefined;
    if (currentRoute && newCache) {
      const fragment = new DocumentFragment();
      fragment.append(...newCache);
      if (enableCache) cache[currentRoute] = fragment;
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
