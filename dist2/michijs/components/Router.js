import { urlFn } from "../routing/createRouter";
import { HistoryManager, useComputedObserve, create } from "../..";
import { VirtualFragment } from "../classes/VirtualFragment";
import { bindObservable } from "../utils";

/**
 * @typedef {import('../routing/types').UrlFunction} UrlFunction
 */

/**
 * @typedef {import('../types').CreateOptions} CreateOptions
 * @typedef {import('../types').ExtendableComponentWithoutChildren} ExtendableComponentWithoutChildren
 * @typedef {import('../types').CreateFCResult} CreateFCResult
 * @typedef {import('../types').SingleJSXElement} SingleJSXElement
 */

/**
 * @template T
 * @typedef {ExtendableComponentWithoutChildren<T> & { routes: Record<string, JSX.Element>; parentRoute?: UrlFunction<any, any>; enableCache?: boolean; }} RouterProps
 */

/**
 * @template [T = CreateFCResult]
 * @param {RouterProps<T>}
 * @param {CreateOptions} options
 * @returns {Node}
 */
export const Router = (
  { as: asTag, routes, parentRoute, enableCache, ...attrs },
  options,
) => {
  const el = asTag
    ? create({
        jsxTag: asTag,
        attrs,
      })
    : new VirtualFragment();
  const cache = {};

  const matchedRoute = useComputedObserve(() => {
    return Object.keys(routes).find((key) =>
      HistoryManager.matches(urlFn(key, parentRoute)().pathname, true),
    );
  }, [HistoryManager]);
  let currentRoute = matchedRoute.valueOf();

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

  return el.valueOf();
};
