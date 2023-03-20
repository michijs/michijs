import { ChangeFunction, ValidatePropertyChangeFunction } from '../types';
import { observeArray } from './observe/observeArray';
import { observeCommonObject } from './observe/observeCommonObject';
import { observeDate } from './observe/observeDate';
import { observeMap } from './observe/observeMap';
import { observeSet } from './observe/observeSet';

export type ObserveHandlerProps = {
  onChange: ChangeFunction;
  shouldValidatePropertyChange: ValidatePropertyChangeFunction;
  propertyPath: string;
};

export type ObserveProps<T> = {
  item: T;
  // subscribeCallback?: (path: string, observer: ObserverCallback<Y>) => void
} & ObserveHandlerProps;

// export type ObservableObject<T, Y = string[]> = T extends Function ? T : (
//   T extends Array<unknown> ? (
//     {
//       [k in NumberKeyOf<T>]: ObservableObject<T[k], Y>
//     }
//     & {
//       [k in NotNumberKeyOf<T>]: T[k]
//     }
//     & Partial<ObservableLike<Y>>
//   )
//   : T extends object ?
//   (
//     {
//       [k in keyof T]: ObservableObject<T[k], Y>
//     }
//     & Partial<ObservableLike<Y>>
//   )
//   : T)

export function observe<T>(props: ObserveProps<T>): T {
  if (props.item && typeof props.item === 'object') {
    if (Array.isArray(props.item))
      return observeArray(props as ObserveProps<unknown[]>) as T;
    // Many built-in objects, for example Map, Set, Date, Promise and others make use of so-called internal slots.
    // These are like properties but reserved for internal, specification-only purposes.
    // For instance, Map stores items in the internal slot [[MapData]].
    // Built-in methods access them directly, not via [[Get]]/[[Set]] internal methods. So Proxy can’t intercept that.
    else if (props.item instanceof Date)
      return observeDate(props as ObserveProps<Date>) as T;
    else if (props.item instanceof Map)
      return observeMap(props as ObserveProps<Map<any, any>>) as T;
    else if (props.item instanceof Set)
      return observeSet(props as ObserveProps<Set<any>>) as T;
    else if (Object.getPrototypeOf(props.item) === Object.prototype)
      return observeCommonObject(props as ObserveProps<object>) as T;
    // console.error(`The object with path "${props.propertyPath}" cannot be observed ${props.item}`)
  }
  return props.item as T;
}
