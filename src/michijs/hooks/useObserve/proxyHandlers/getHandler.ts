import type { ObservableProxyHandler, ObservableType, ParentSubscription } from "../../../types";
import { PrimitiveProxyHandler } from "./PrimitiveProxyHandler";
import { FunctionProxyHandler } from "./FunctionProxyHandler";

export const getHandler = (value: unknown, parentSubscription?: ParentSubscription<any>, rootObservableCallback?: () => ObservableType<any>): ObservableProxyHandler<any, any> => {
  const typeOfValue = typeof value;

  switch (typeOfValue) {
    case "function":
      return new FunctionProxyHandler(rootObservableCallback);
    default:
      // TODO: add props
      return new PrimitiveProxyHandler(parentSubscription, rootObservableCallback)
  }
}