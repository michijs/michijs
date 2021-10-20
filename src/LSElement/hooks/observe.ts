import { ChangeFunction, ValidatePropertyChangeFunction } from '../types';
import { observeArray } from './observe/observeArray';
import { observeCommonObject } from './observe/observeCommonObject';
import { observeDate } from './observe/observeDate';
import { observeMap } from './observe/observeMap';
import { observeSet } from './observe/observeSet';

export type ObserveHandlerProps = {
  onChange: ChangeFunction,
  shouldValidatePropertyChange: ValidatePropertyChangeFunction,
  rootPropertyName?: string | symbol
}

export type ObserveProps<T extends object> = {
  item: T
} & ObserveHandlerProps

export function observe<T extends object>(props: ObserveProps<T>): T {
  const { item } = props;
  if (item && typeof item === 'object') {
    if (Array.isArray(item)) {
      return observeArray(props as ObserveProps<Array<T>>) as T;
      // Many built-in objects, for example Map, Set, Date, Promise and others make use of so-called internal slots.
      // These are like properties but reserved for internal, specification-only purposes. 
      // For instance, Map stores items in the internal slot [[MapData]]. 
      // Built-in methods access them directly, not via [[Get]]/[[Set]] internal methods. So Proxy can’t intercept that.
    } else if (item instanceof Date) {
      return observeDate(props as ObserveProps<Date>) as T;
    } else if (item instanceof Map) {
      return observeMap(props as ObserveProps<Map<any,any>>) as T;
    } else if (item instanceof Set) {
      return observeSet(props as ObserveProps<Set<any>>) as T;
    } else if (item instanceof Error || item instanceof WeakMap || item instanceof WeakSet || ArrayBuffer.isView(item) || item instanceof RegExp || item instanceof Promise) {
      return item;
    }
    return observeCommonObject(props) as T;
  }
  return item;
}
