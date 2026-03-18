import type { ObservableProxyPort } from "@domain";
import type { AnyObject } from "@shared";

export interface UseSearchParams {
  <
    // Removed because it doesnt work with observables
    // T extends Record<string, unknown> = Record<string, unknown>,
    T = AnyObject,
  >(): ObservableProxyPort<T>;
}

export interface UseHash {
  <T extends string = string>(): ObservableProxyPort<Record<T, boolean | undefined>>;
}
