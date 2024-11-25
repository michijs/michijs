import type { ObservableProxyHandler, ObservableType, ParentSubscription } from "../../types";
import { PrimitiveProxyHandler } from "./PrimitiveProxyHandler";
import { FunctionProxyHandler } from "./FunctionProxyHandler";
import { isPrototypeOfObject } from "../../utils";
import { DateProxyHandler } from "./DateProxyHandler";
import { MapProxyHandler } from "./MapProxyHandler";
import { SetProxyHandler } from "./SetProxyHandler";
import { ArrayProxyHandler } from "./ArrayProxyHandler";
import { CommonObjectProxyHandler } from "./CommonObjectProxyHandler";

export const getObjectHandler = (value: unknown, parentSubscription?: ParentSubscription<any>, rootObservableCallback?: () => ObservableType<any>): ObservableProxyHandler<any, any> | void => {
  if(isPrototypeOfObject(value))
    return new CommonObjectProxyHandler(parentSubscription, rootObservableCallback);
  if(Array.isArray(value))
    return new ArrayProxyHandler(parentSubscription, rootObservableCallback);
  if(value instanceof Date)
    return new DateProxyHandler(parentSubscription, rootObservableCallback);;
  if(value instanceof Set)
    return new SetProxyHandler(parentSubscription, rootObservableCallback);
  if(value instanceof Map)
    return new MapProxyHandler(parentSubscription, rootObservableCallback);
}

export const getHandler = (unproxifiedValue: unknown, parentSubscription?: ParentSubscription<any>, rootObservableCallback?: () => ObservableType<any>): ObservableProxyHandler<any, any> => {
  const typeOfValue = typeof unproxifiedValue;

  switch (typeOfValue) {
    // Intentional order
    case "function": {
      return new FunctionProxyHandler(rootObservableCallback);
    }
    case "object": {
      if (unproxifiedValue) {
        const newHandler = getObjectHandler(unproxifiedValue, parentSubscription, rootObservableCallback);
        if(newHandler)
          return newHandler
      }
    }
    default: 
      return new PrimitiveProxyHandler(parentSubscription, rootObservableCallback)
  }
}