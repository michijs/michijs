import { ChangeFunction, ObservableLike, ValidatePropertyChangeFunction } from "../types";
import { observeArray } from "./observe/observeArray";
import { observeCommonObject } from "./observe/observeCommonObject";
import { observeDate } from "./observe/observeDate";
import { observeMap } from "./observe/observeMap";
import { observeSet } from "./observe/observeSet";
import { observeValue } from "./observe/observeValue";

export type ObserveHandlerProps = {
  onChange: ChangeFunction;
  shouldValidatePropertyChange: ValidatePropertyChangeFunction;
  parentSubscribe?(): void;
  propertyPath: string;
};

export type ObserveProps<T> = {
  item: T;
} & ObserveHandlerProps;

export type ObservableValue<T> = T & ObservableLike<T>

export function observe<T>(props: ObserveProps<T>): ObservableValue<T> {
  if (props.item && typeof props.item === "object") {
    if (Array.isArray(props.item))
      return observeArray(props as ObserveProps<unknown[]>) as ObservableValue<T>;
    // Many built-in objects, for example Map, Set, Date, Promise and others make use of so-called internal slots.
    // These are like properties but reserved for internal, specification-only purposes.
    // For instance, Map stores items in the internal slot [[MapData]].
    // Built-in methods access them directly, not via [[Get]]/[[Set]] internal methods. So Proxy can’t intercept that.
    else if (props.item instanceof Date)
      return observeDate(props as ObserveProps<Date>) as ObservableValue<T>;
    else if (props.item instanceof Map)
      return observeMap(props as ObserveProps<Map<any, any>>) as ObservableValue<T>;
    else if (props.item instanceof Set)
      return observeSet(props as ObserveProps<Set<any>>) as ObservableValue<T>;
    else if (Object.getPrototypeOf(props.item) === Object.prototype)
      return observeCommonObject(props as ObserveProps<object>) as ObservableValue<T>;
    // console.error(`The object with path "${props.propertyPath}" cannot be observed ${props.item}`)
  }
  return observeValue(props.item) as ObservableValue<T>;
}