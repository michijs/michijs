import type { ObservableType, ParentSubscription } from "../../types";
import { ProxiedValueV2 } from "../../classes/ProxiedValue";
import { ObservableProxyHandler } from "./proxyHandlers/ObservableProxyHandler";
// import { setObservableValue } from "../../utils/setObservableValue";
const observableProxyHandler = new ObservableProxyHandler();
/**
 * **Warning** Still WIP - do not use in production
 */
export function observePrimitiveValueV2<T>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>,
): ObservableType<T> {
  const target = new Proxy(new ProxiedValueV2(item, parentSubscription, rootObservableCallback), observableProxyHandler);

  return target as unknown as ObservableType<T>;
}
