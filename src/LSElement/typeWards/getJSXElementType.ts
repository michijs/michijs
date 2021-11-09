import { ClassJSXElement, FragmentJSXElement } from '../types';

export enum JSXElementType {
  ARRAY,
  OBJECT,
  PRIMITIVE,
  FUNCTION,
  FRAGMENT,
  CLASS,
  EMPTY
}

function getValue(value) {
  return function get<T>() {
    return value as T;
  };
}

export function getJSXElementType(value: JSX.Element): [JSXElementType, ReturnType<typeof getValue>] {
  if (value) {
    if (Array.isArray(value)) {
      return [JSXElementType.ARRAY, getValue(value)];
    } else if (typeof value === 'object' && 'tag' in value) {//Fix for non-jsx objects
      if (value.tag === undefined) {
        if ((value as FragmentJSXElement).attrs.children.length === 0)
          return [JSXElementType.EMPTY, getValue(value)];
        return [JSXElementType.FRAGMENT, getValue(value)];
      } else if (typeof value.tag === 'function') {
        if ((value.tag as unknown as ClassJSXElement).tag)
          return [JSXElementType.CLASS, getValue(value)];
        return [JSXElementType.FUNCTION, getValue(value)];
      }
      return [JSXElementType.OBJECT, getValue(value)];
    }
    return [JSXElementType.PRIMITIVE, getValue(value)];
  }
  if(value === 0){
    return [JSXElementType.PRIMITIVE, getValue(value)];
  }
  return [JSXElementType.EMPTY, getValue(value)];
}