import { Router } from '../components/Router';
import { FC, GetElementProps } from '../types';

export type SearchParams = Record<string, (...args: any) => any> | undefined;
export type Hash = [`#${string}` | ''] | undefined;

export type GetSearchParams<S extends SearchParams> = S extends {} ? { [k in keyof S]?: ReturnType<S[k]> } : undefined
export type GetHash<H extends Hash> = H extends {} ? {[k in H[number]]: boolean} : undefined

export type PagesFunction<S extends SearchParams = undefined, H extends Hash = undefined> = FC<{ searchParams: GetSearchParams<S>, hash: GetHash<H> }>;
export type UrlFunction<S extends SearchParams = undefined, H extends Hash = undefined> = (searchParamsAndHash?: { searchParams?: GetSearchParams<S>, hash?: keyof GetHash<H> }) => URL;

export type CommonRouteProps = {
  /**The title of the page */
  title?: string,
  // preserveState?: boolean,
  searchParams?: SearchParams
  hash?: Hash
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

export type CreateRouterResult<R extends Record<string, Route>> = {
  urls: {
    [k in keyof R]: UrlFunction<R[k]['searchParams'], R[k]['hash']>
  },
  Router: FC<GetElementProps<typeof Router>>,
  pages: {
    [k in keyof R]: (
      page: PagesFunction<R[k]['searchParams'], R[k]['hash']>
    ) => ReturnType<FC>
  }
}