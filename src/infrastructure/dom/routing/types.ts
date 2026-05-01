import type { Router } from "./components/Router";
import type { ExtendableComponentWithoutChildren } from "../rendering/types";
import type { UrlFunction } from "../../platform";
import type { ObservableProxyPort } from "#domain";
import type { AnyObject, ExtractParamKeys } from "#shared";

export type RouterProps<T> = ExtendableComponentWithoutChildren<T> & {
  routes?: Record<string, JSX.Element>;
  parentRoute?: UrlFunction;
  /** Allows to caché then / else components. */
  enableCache?: boolean;
};

export type CreateRouterResult<R extends Record<string, JSX.Element>> = [
  {
    [k in keyof R]: k extends string ? UrlFunction<k> : UrlFunction;
  },
  typeof Router,
];

export interface UseSearchParams {
  <
    // Removed because it doesnt work with observables
    // T extends Record<string, unknown> = Record<string, unknown>,
    T = AnyObject,
  >(): ObservableProxyPort<T>;
}

export interface UseHash {
  <T extends string = string>(): ObservableProxyPort<
    Record<T, boolean | undefined>
  >;
}

export interface UseParams {
  <T extends string>(
    pattern: T,
    parentRoute?: UrlFunction,
  ): ObservableProxyPort<Record<ExtractParamKeys<T>, string>>;
}
