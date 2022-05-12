import { ChangeFunction, ObservableLike, ObserverCallback, ValidatePropertyChangeFunction } from '../types';
import { observeArray } from './observe/observeArray';
import { observeCommonObject } from './observe/observeCommonObject';
import { observeDate } from './observe/observeDate';
import { observeMap } from './observe/observeMap';
import { observeSet } from './observe/observeSet';
import { clone } from './observe/clone';

export type ObserveHandlerProps = {
  onChange: ChangeFunction,
  shouldValidatePropertyChange: ValidatePropertyChangeFunction,
  propertyPath: string
}

export type ObserveProps<T, Y> = {
  item: T,
  subscribeCallback?: (path: string, observer: ObserverCallback<Y>) => void
} & ObserveHandlerProps;

export type ObservableObject<T, Y = string[]> = T extends Function ? T : (T extends object ? {
  [k in keyof T]: ObservableObject<T[k], Y>
} & Partial<ObservableLike<Y>> : T)

export function observe<T, Y>(props: ObserveProps<T, Y>): ObservableObject<T, Y> {
  if (props.item && typeof props.item === 'object') {
    if (Array.isArray(props.item))
      return observeArray(props as unknown as ObserveProps<unknown[], Y>) as unknown as ObservableObject<T, Y>;
    // Many built-in objects, for example Map, Set, Date, Promise and others make use of so-called internal slots.
    // These are like properties but reserved for internal, specification-only purposes. 
    // For instance, Map stores items in the internal slot [[MapData]]. 
    // Built-in methods access them directly, not via [[Get]]/[[Set]] internal methods. So Proxy can’t intercept that.
    else if (props.item instanceof Date)
      return observeDate(props as unknown as ObserveProps<Date, Y>) as unknown as ObservableObject<T, Y>;
    else if (props.item instanceof Map)
      return observeMap(props as unknown as ObserveProps<Map<any, any>, Y>) as unknown as ObservableObject<T, Y>;
    else if (props.item instanceof Set)
      return observeSet(props as unknown as ObserveProps<Set<any>, Y>) as unknown as ObservableObject<T, Y>;
    else if (Object.getPrototypeOf(props.item) === Object.prototype)
      return observeCommonObject(props as unknown as ObserveProps<object, Y>) as unknown as ObservableObject<T, Y>;
    else if (props.item instanceof Node)
      return props.item as unknown as ObservableObject<T, Y>;
    return clone(props.item) as unknown as ObservableObject<T, Y>;
  }
  return props.item as ObservableObject<T, Y>;
}
