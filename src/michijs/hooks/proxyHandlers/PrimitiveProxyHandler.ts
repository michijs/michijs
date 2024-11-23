import type { ProxiedValueV2 } from "../../classes/ProxiedValue";
import type {
  ObservableType,
  ParentSubscription,
  ObservableProxyHandler,
} from "../../types";
import { getObjectHandler } from "./getHandler";
import { FunctionProxyHandler } from "./FunctionProxyHandler";
import { unproxify } from "../../utils/unproxify";

export class PrimitiveProxyHandler<T>
  implements ObservableProxyHandler<ProxiedValueV2<T>, T>
{
  parentSubscription?: ParentSubscription<any>;
  rootObservableCallback?: () => ObservableType<any>;

  constructor(
    parentSubscription?: ParentSubscription<any>,
    rootObservableCallback?: () => ObservableType<any>,
  ) {
    this.rootObservableCallback = rootObservableCallback;
    this.parentSubscription = parentSubscription;
  }

  apply(target: ProxiedValueV2<T>, _, args) {
    // TODO: Tried using target instead of proxy() but for some reason it mutates the proxy itself. Test with toggle fieldest on a11y tests
    if (args.length > 0) {
      const newValue = unproxify(args[0]);
      // Should check if the type if the same first
      switch (typeof newValue) {
        // Intentional order
        case "function": {
          target.handler = new FunctionProxyHandler(
            this.rootObservableCallback,
          );
          return target.handler.apply(target, _, args);
        }
        case "object":
          // Ignore null
          if (newValue) {
            const newHandler = getObjectHandler(
              newValue,
              this.parentSubscription,
              this.rootObservableCallback,
            );
            if (newHandler) {
              target.handler = newHandler;
              return target.handler.apply(target, _, args);
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
    return target.$value[p];
  }
}
