import type { Hash, SearchParams } from "@shared";

export type UrlFunction<
  S extends SearchParams = SearchParams,
  H extends Hash = Hash,
> = (searchParamsAndHash?: { searchParams?: S; hash?: H }) => URL;
