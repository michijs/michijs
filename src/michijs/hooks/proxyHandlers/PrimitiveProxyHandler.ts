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
    if (args?.length > 0) {
      const unproxifiedValue = unproxify(args[0]);
      switch (typeof unproxifiedValue) {
        // Intentional order
        // TODO: check this
        case "function": {
          return this.updateHandlerAndValue(
            target,
            unproxifiedValue,
            new FunctionProxyHandler(this.rootObservableCallback),
          );
        }
        case "object":
          // Ignore null
          if (unproxifiedValue) {
            const newHandler = getObjectHandler(
              unproxifiedValue,
              this.parentSubscription,
              this.rootObservableCallback,
            );
            if (newHandler)
              return this.updateHandlerAndValue(
                target,
                unproxifiedValue,
                newHandler,
              );
          }
        // If its an non observable object continue
        default:
          this.applyNewValue(target, unproxifiedValue);
      }
      return;
    }
    return target.valueOf();
  }
  applyNewValue(target: ProxiedValueV2<T>, unproxifiedValue: T) {
    const oldValue = target.$value;
    target.$value = unproxifiedValue;

    const notifiableObservers = target.notifiableObservers;
    if (notifiableObservers && unproxifiedValue !== oldValue)
      target.notifyCurrentValue(notifiableObservers);
  }

  get(target: ProxiedValueV2<T>, p: string | symbol, receiver) {
    if (p in target) return Reflect.get(target, p, receiver);
    // Trying to get a property on an nil value will return an object with a nil property
    if (isNil(target.$value))
      this.updateHandlerAndValue(target, { [p]: undefined });
    return target.$value[p];
  }
}
