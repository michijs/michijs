import type { Router } from "./components/Router";
import type { ExtendableComponentWithoutChildren } from "../rendering/types";
import type { Hash, SearchParams } from "@shared";

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

export type CreateRouterResult<R extends Record<string, JSX.Element>> = [
  {
    [k in keyof R]: UrlFunction;
  },
  typeof Router,
];
