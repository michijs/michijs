import { EmptyObject } from '../types';
import { AsyncRoute, CreateRouteResult, RedirectRoute, SyncRoute } from './types';

export function createRoute<SearchParams extends { [key: string]: any; } = undefined, Hash extends `#${string}` | '' = undefined>(route: SyncRoute | RedirectRoute): CreateRouteResult<SearchParams, Hash> {
  return route as unknown as CreateRouteResult<SearchParams, Hash>;
}
export function createAsyncRoute<SearchParams extends { [key: string]: any; } = undefined, Hash extends `#${string}` | '' = undefined>() {
  return function <O extends Object = EmptyObject>(route: AsyncRoute<O>): CreateRouteResult<SearchParams, Hash> {
    return route as unknown as CreateRouteResult<SearchParams, Hash>;
  };
}
