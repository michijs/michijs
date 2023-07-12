import { Observable } from "../types";
import { observeArray } from "./observe/observeArray";
import { observeCommonObject } from "./observe/observeCommonObject";
import { observeDate } from "./observe/observeDate";
import { observeMap } from "./observe/observeMap";
import { observeSet } from "./observe/observeSet";
import { observeValue } from "./observe/observeValue";

export function observe<T>(item: T): Observable<T> {
  if (item && typeof item === "object") {
    if (Array.isArray(item)) return observeArray(item) as Observable<T>;
    // Many built-in objects, for example Map, Set, Date, Promise and others make use of so-called internal slots.
    // These are like properties but reserved for internal, specification-only purposes.
    // For instance, Map stores items in the internal slot [[MapData]].
    // Built-in methods access them directly, not via [[Get]]/[[Set]] internal methods. So Proxy can’t intercept that.
    else if (item instanceof Date)
      return observeDate(item) as unknown as Observable<T>;
    else if (item instanceof Map)
      return observeMap(item) as unknown as Observable<T>;
    else if (item instanceof Set)
      return observeSet(item) as unknown as Observable<T>;
    else if (Object.getPrototypeOf(item) === Object.prototype)
      return observeCommonObject(item) as Observable<T>;
    // console.error(`The object with path "${props.propertyPath}" cannot be observed ${item}`)
  }
  return observeValue(item) as unknown as Observable<T>;
}
