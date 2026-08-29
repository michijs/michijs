import type { RouterProps } from "../types";
import { useComputedObserve } from "#domain";
import { HistoryManager } from "../entities/HistoryManager";
import { urlFn } from "../../../platform/url/utils/urlFn";
import { If } from "../../rendering/components/If";

export const Router = <const T>({
  as: asTag,
  routes,
  parentRoute,
  enableCache,
  ...attrs
}: RouterProps<T>) => {
  const finalRoutes = routes ?? {};
  const finalRoutesKeys = Object.keys(finalRoutes);
  const finalRoutesValues = Object.values(finalRoutes).map<
    [number, JSX.Element]
  >((x, i) => [i, x]);

  if (!parentRoute) {
    const defaultRoute = finalRoutesKeys.at(-1);
    if (defaultRoute) finalRoutesValues.push([-1, finalRoutes[defaultRoute]]);
  }

  const matchedRoute = useComputedObserve(
    () =>
      finalRoutesKeys.findIndex((key) =>
        HistoryManager.matches(urlFn(key, parentRoute)().pathname, true),
      ),
    { deps: [HistoryManager] },
  );

  return If<T, typeof matchedRoute>(
    matchedRoute,
    finalRoutesValues,
    undefined,
    {
      enableCache,
      as: asTag,
      // @ts-ignore
      attrs,
    },
  );
};
