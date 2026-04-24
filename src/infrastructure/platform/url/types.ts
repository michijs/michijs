import type { Hash, SearchParams, ExtractParamKeys } from "@shared";

type UrlFunctionArgs<
  P extends string,
  S extends SearchParams,
  H extends Hash,
> = [ExtractParamKeys<P>] extends [never]
  ? [options?: { params?: Record<string, string | number>; searchParams?: S; hash?: H }]
  : [options: { params: Record<ExtractParamKeys<P>, string | number> & Record<string, string>; searchParams?: S; hash?: H }];

export type UrlFunction<
  P extends string = string,
  S extends SearchParams = SearchParams,
  H extends Hash = Hash,
> = (...args: UrlFunctionArgs<P, S, H>) => URL;
