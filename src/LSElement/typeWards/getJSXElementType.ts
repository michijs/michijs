export enum JSXElementType {
  ARRAY,
  OBJECT,
  PRIMITIVE,
  FUNCTION,
  FRAGMENT,
}

function getValue(value) {
  return function get<T>() {
    return value as T;
  };
}

export function getJSXElementType(value: JSX.Element): [JSXElementType, ReturnType<typeof getValue>] {
  if (Array.isArray(value)) {
    return [JSXElementType.ARRAY, getValue(value)];
  } else if (typeof value === 'object') {
    if (value.tag === undefined) {
      return [JSXElementType.FRAGMENT, getValue(value)];
    } else if (typeof value.tag === 'function') {
      return [JSXElementType.FUNCTION, getValue(value)];
    } 
    return [JSXElementType.OBJECT, getValue(value)];
    
  } 
  return [JSXElementType.PRIMITIVE, getValue(value)];
  
}