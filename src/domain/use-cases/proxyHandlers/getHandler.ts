import type {
  ProxiedValuePort,
  ProxyHandlerPort,
  ObservableProxyPort,
  ParentSubscription,
} from "@ports";
import { PrimitiveProxyHandler } from "./PrimitiveProxyHandler";
import { FunctionProxyHandler } from "./FunctionProxyHandler";
import { isPrototypeOfObject } from "@shared";
import { DateProxyHandler } from "./DateProxyHandler";
import { MapProxyHandler } from "./MapProxyHandler";
import { SetProxyHandler } from "./SetProxyHandler";
import { ArrayProxyHandler } from "./ArrayProxyHandler";
import { CommonObjectProxyHandler } from "./CommonObjectProxyHandler";

export const getObjectHandler = (
  value: unknown,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableProxyPort<any>,
): ProxyHandlerPort<any> | undefined => {
  if (isPrototypeOfObject(value))
    return new CommonObjectProxyHandler(
      parentSubscription,
      rootObservableCallback,
    );
  if (Array.isArray(value))
    return new ArrayProxyHandler(parentSubscription, rootObservableCallback);
  if (value instanceof Date)
    return new DateProxyHandler(parentSubscription, rootObservableCallback);
  if (value instanceof Set)
    return new SetProxyHandler(parentSubscription, rootObservableCallback);
  if (value instanceof Map)
    return new MapProxyHandler(parentSubscription, rootObservableCallback);
};

export const getHandler = (
  value: unknown,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableProxyPort<any>,
): ProxyHandlerPort<any> => {
  const typeOfValue = typeof (
    (value as ProxiedValuePort<unknown>)?.$value ?? value
  );

  switch (typeOfValue) {
    // Intentional order
    case "function": {
      return new FunctionProxyHandler(rootObservableCallback);
    }
    // biome-ignore-start lint/suspicious/noFallthroughSwitchClause: Intentional
    case "object": {
      if (value) {
        const newHandler = getObjectHandler(
          value,
          parentSubscription,
          rootObservableCallback,
        );
        if (newHandler) return newHandler;
      }
    }
    // biome-ignore-end lint/suspicious/noFallthroughSwitchClause: Intentional
    default:
      return new PrimitiveProxyHandler(
        parentSubscription,
        rootObservableCallback,
      );
  }
};
