import { Router } from '../components/Router';
import { AnyObject, FC, GetElementProps } from '../types';

export type SearchParams = AnyObject | undefined;
export type Hash = `#${string}` | '' | undefined;

export type PagesFunction<S extends SearchParams = undefined, H extends Hash = undefined> = FC<{ searchParams: S, hash: { [k in (H extends string ? H : '')]?: boolean } }>;
export type UrlFunction<S extends SearchParams = undefined, H extends Hash = undefined> = (searchParamsAndHash?: { searchParams?: S, hash?: H }) => URL;

export type CommonRouteProps = {
  /**The title of the page */
  title?: string,
  // preserveState?: boolean,
}

export type SyncRoute = {
  /**The component to display */
  component?: JSX.Element,
} & CommonRouteProps

export type AsyncRoute = {
  // if typed properly the type of pages does not work
  /** The promise to wait */
  promise: Function,
  /** The component key (by default is default)*/
  /**The component to display while the promise is loading */
  loadingComponent?: JSX.Element
} & CommonRouteProps

// export type RedirectRoute = {
//     redirectTo?: () => string | URL,
// }

export type Route = SyncRoute | AsyncRoute;//| RedirectRoute ;

export type CreateRouterSearchParamsAndHash = Record<string, {
  searchParams?: SearchParams,
  hash?: Hash
}>

export type CreateRouterResult<T extends CreateRouterSearchParamsAndHash, R extends Record<string, Route>> = {
  urls: {
    [k in keyof R]: k extends keyof T ? UrlFunction<T[k]['searchParams'], T[k]['hash']> : UrlFunction
  },
  Router: FC<GetElementProps<typeof Router>>,
  pages: {
    [k in keyof R]: (
      page: (k extends keyof T ? PagesFunction<T[k]['searchParams'], T[k]['hash']> : FC)
    ) => ReturnType<FC>
  }
}