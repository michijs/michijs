import type {
  ObservableOrConst,
  PromiseResult,
  UsePromiseShouldWait,
} from "#ports";
import type { AnyObject, SearchParams } from "#shared";

export interface RequestInitUseFetch<B> extends Omit<RequestInit, "body"> {
  body?: B;
}

export interface DoFetchProps<
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
> extends RequestInitUseFetch<ObservableOrConst<B>> {
  input: string;
  searchParams?: { [k in keyof S]: ObservableOrConst<S[k]> };
}

export type UseFetchCallback<
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
> = () => DoFetchProps<S, B> | Promise<DoFetchProps<S, B>>;

export interface DoFetch {
  <
    R,
    S extends SearchParams = undefined,
    B extends AnyObject | undefined | string = undefined,
  >(
    request: DoFetchProps<S, B>,
  ): Promise<R>;
}

export interface UseFetch {
  <
    R,
    S extends SearchParams = undefined,
    B extends AnyObject | undefined | string = undefined,
  >(
    callback: UseFetchCallback<S, B>,
    shouldWait?: UsePromiseShouldWait,
  ): PromiseResult<Promise<R>>;
}
