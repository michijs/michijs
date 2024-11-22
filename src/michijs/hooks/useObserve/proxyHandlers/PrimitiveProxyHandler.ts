import type { ProxiedValueV2 } from "../../../classes/ProxiedValue";
import type { ObservableType, ParentSubscription } from "../../../types";
import { getHandler } from "./getHandler";
import { isPrototypeOfObject } from "../../../utils";

export class PrimitiveProxyHandler<T>
  implements ProxyHandler<ProxiedValueV2<T>>
{
  parentSubscription?: ParentSubscription<any>;
  rootObservableCallback?: () => ObservableType<any>;

  constructor(
    rootObservableCallback?: () => ObservableType<any>,
    parentSubscription?: ParentSubscription<any>,
  ) {
    this.rootObservableCallback = rootObservableCallback;
    this.parentSubscription = parentSubscription;
  }

  apply(target: ProxiedValueV2<T>, _, args) {
    // TODO: Tried using target instead of proxy() but for some reason it mutates the proxy itself. Test with toggle fieldest on a11y tests
    if (args.length > 0) {
      const newValue = args[0].valueOf();
      // Should check if the type if the same first
      switch (typeof newValue) {
        case "function": {
          const newHandler = getHandler(
            newValue,
            this.rootObservableCallback,
            this.parentSubscription,
          );
          target.handler = newHandler;
          return target.handler!.apply(target, _, args);
        }
        case "object":
          // Ignore null
          if (newValue && isPrototypeOfObject(newValue)) {
            const newHandler = getHandler(
              newValue,
              this.rootObservableCallback,
              this.parentSubscription,
            );
            target.handler = newHandler;
            return target.handler!.apply(target, _, args);
          }
        // If its an non observable object continue
        default: {
          const notifiableObservers = target.notifiableObservers;
          if (notifiableObservers && newValue !== target.$privateValue) {
            target.$privateValue = newValue;

            target.notifyCurrentValue();
          }
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
