import type { RouterProps } from "../routing/types";
import type { SingleJSXElement } from "../types";
import { VirtualFragment } from "../classes/VirtualFragment";
import { bindObservable } from "../utils/bindObservable";
import { create } from "../DOM/create/create";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { HistoryManager } from "../classes/HistoryManager";
import { urlFn } from "../routing/utils/urlFn";

export const Router = <const T>(
  { as: asTag, routes, parentRoute, enableCache, ...attrs }: RouterProps<T>,
  contextElement,
  contextNamespace,
) => {
  const el = asTag
    ? (create({
        jsxTag: asTag,
        attrs,
      } as unknown as SingleJSXElement) as ChildNode & ParentNode)
    : new VirtualFragment();
  const cache: Record<string, DocumentFragment> = {};

  const matchedRoute = useComputedObserve(() => {
    return Object.keys(routes ?? {}).find((key) =>
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
        const component = routes?.[newMatchedRoute];
        el.replaceChildren(create(component, contextElement, contextNamespace));
      }
    }
    currentRoute = newMatchedRoute;
  });

  return el.valueOf() as Node;
};
