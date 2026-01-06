import type { RouterProps } from "../../domain/routing/types";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { HistoryManager } from "../../domain/routing/HistoryManager/index";
import { urlFn } from "../../domain/routing/utils/urlFn";
import { If } from "./If";

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
    [HistoryManager],
    { usePrimitive: true },
  ) as any;

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
