import type { Router } from "../components/Router";
import type { AnyObject, ExtendableComponentWithoutChildren } from "../types";

export type SearchParams = AnyObject | undefined;
export type Hash = `#${string}` | "" | undefined;

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
