import { ObservableType, ParentSubscription } from "../../../types";
import { PrimitiveProxyHandler } from "./PrimitiveProxyHandler";

export const getHandler = (value: unknown, rootObservableCallback?: () => ObservableType<any>,
  parentSubscription?: ParentSubscription<any>): ProxyHandler<any> => {
  const typeOfValue = typeof value;

  switch (typeOfValue) {
    default:
      // TODO: add props
      return new PrimitiveProxyHandler(rootObservableCallback, parentSubscription)
  }
}