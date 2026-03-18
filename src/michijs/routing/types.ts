import type { Router } from "../../infrastructure/dom/routing/components/Router";
import type { ExtendableComponentWithoutChildren } from "../types";
import type { Hash } from "../../shared/types/Hash";
import type { SearchParams } from "../../shared/types/SearchParams";

export type UrlFunction<
  S extends SearchParams = SearchParams,
  H extends Hash = Hash,
> = (searchParamsAndHash?: { searchParams?: S; hash?: H }) => URL;

export type RouterProps<T> = ExtendableComponentWithoutChildren<T> & {
  routes?: Record<string, JSX.Element>;
  parentRoute?: UrlFunction<any, any>;
  /** Allows to caché then / else components. */
  enableCache?: boolean;
};

// export type AsyncRoute = {
//   // if typed properly the type of pages does not work
//   /** The promise to wait */
//   promise: Function;
//   /** The component key (by default is default)*/
//   /**The component to display while the promise is loading */
//   loadingComponent?: JSX.Element;
// } & CommonRouteProps;

// export type RedirectRoute = {
//     redirectTo?: () => string | URL,
// }

export type CreateRouterResult<R extends Record<string, JSX.Element>> = [
  {
    [k in keyof R]: UrlFunction;
  },
  typeof Router,
];
