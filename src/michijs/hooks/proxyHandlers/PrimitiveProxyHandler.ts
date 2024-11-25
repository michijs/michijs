import type { ProxiedValueV2 } from "../../classes/ProxiedValue";
import type { ObservableProxyHandler } from "../../types";
import { getObjectHandler } from "./getHandler";
import { SharedProxyHandler } from "./SharedProxyHandler";
import { FunctionProxyHandler } from "./FunctionProxyHandler";
import { unproxify } from "../../utils/unproxify";
import { isNil } from "../../utils";

export class PrimitiveProxyHandler<T>
  extends SharedProxyHandler<T>
  implements ObservableProxyHandler<ProxiedValueV2<T>, T>
{
  apply(target: ProxiedValueV2<T>, _, args: any[]) {
    if (args?.length > 0)
      return this.applyUproxifiedValue(target, unproxify(args[0]));
    return target.valueOf();
  }
  applyUproxifiedValue(target: ProxiedValueV2<T>, unproxifiedValue: T) {
    switch (typeof unproxifiedValue) {
      // Intentional order
      // TODO: check this
      case "function": {
        target.handler = new FunctionProxyHandler(this.rootObservableCallback);
        return target.handler.applyUproxifiedValue(target, unproxifiedValue);
      }
      case "object":
        // Ignore null
        if (unproxifiedValue) {
          const newHandler = getObjectHandler(
            unproxifiedValue,
            this.parentSubscription,
            this.rootObservableCallback,
          );
          if (newHandler) {
            target.handler = newHandler;
            return target.handler.applyUproxifiedValue(
              target,
              unproxifiedValue,
            );
          }
        }
      // If its an non observable object continue
      default: {
        const oldValue = target.$privateValue;
        target.$privateValue = unproxifiedValue;

        const notifiableObservers = target.notifiableObservers;
        if (notifiableObservers && unproxifiedValue !== oldValue)
          target.notifyCurrentValue(notifiableObservers);
      }
    }
    return;
  }

  get(target: ProxiedValueV2<T>, p: string | symbol, receiver) {
    if (p in target) return Reflect.get(target, p, receiver);
    // Trying to get a property on an nil value will return an object with a nil property
    if (isNil(target.$value))
      this.updateHandlerAndValue(target, { [p]: undefined });
    return target.$value[p];
  }
}
