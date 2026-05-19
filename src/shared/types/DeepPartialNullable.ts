/**
 * Recursively makes all properties of an object optional **and** nullable
 * (`undefined | null`). Used by `ObservableProxyPort` to propagate the
 * nullability of a root observable down to every nested child — accessing a
 * deep property on an observable whose root may be `undefined` would itself
 * yield `undefined`, so the static type must reflect that.
 *
 * Arrays, functions, Maps, Sets, Dates, Promises and DOM/host objects (any
 * type carrying `addEventListener`) are left intact — they are either handled
 * by dedicated branches in `ObservableProxyPortHelper` or are not the kind of
 * plain data structures the deep-proxy is meant to deeply mirror.
 */
export type DeepPartialNullable<T> = T extends
  | Function
  | Date
  | Promise<any>
  | Map<any, any>
  | Set<any>
  | Array<any>
  ? T | undefined | null
  : T extends { addEventListener: any }
    ? T | undefined | null
    : T extends object
      ?
          | { [P in keyof T]?: DeepPartialNullable<T[P]> }
          | undefined
          | null
      : T | undefined | null;
