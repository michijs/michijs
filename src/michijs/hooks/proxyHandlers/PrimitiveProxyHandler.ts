import { ProxiedValueV2 } from "../../classes/ProxiedValue";
import type { ObservableProxyHandler } from "../../types";
import { getObjectHandler } from './getHandler'
import { SharedProxyHandler } from './SharedProxyHandler'
import { FunctionProxyHandler } from "./FunctionProxyHandler";
import { unproxify } from "../../utils/unproxify";
import { isNil } from "../../utils";

export class PrimitiveProxyHandler<T> extends SharedProxyHandler<T> implements ObservableProxyHandler<ProxiedValueV2<T>, T> {

  apply(target: ProxiedValueV2<T>, _, args) {
    if (args?.length > 0) {
      const newValue = unproxify(args[0]);
      // Should check if the type if the same first
      switch (typeof newValue) {
        // Intentional order
        case "function": {
          target.handler = new FunctionProxyHandler(this.rootObservableCallback);
          return target.handler.apply(target, _, args);
        }
        case "object":
          // Ignore null
          if (newValue) {
            const newHandler = getObjectHandler(newValue, this.parentSubscription, this.rootObservableCallback);
            if (newHandler) {
              target.handler = newHandler;
              return target.handler.apply(target, _, args)
            }
          }
        // If its an non observable object continue
        default: {
          const oldValue = target.$privateValue;
          target.$privateValue = newValue;

          const notifiableObservers = target.notifiableObservers;
          if (notifiableObservers && newValue !== oldValue)
            target.notifyCurrentValue(notifiableObservers);
        }
      }
      return;
    }
    return target.valueOf();
  }

  get(target, p, receiver) {
    if (p in target) return Reflect.get(target, p, receiver);
    // Trying to get a property on an nil value will return an object with a nil property
    if (isNil(target.$value))
      this.apply(target, target, [{ [p]: undefined }]);
    return target.$value[p];
  }
}
