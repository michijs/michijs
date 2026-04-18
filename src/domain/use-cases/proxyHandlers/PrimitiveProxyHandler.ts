import type { ProxiedValuePort, ProxyHandlerPort } from "@ports";
import { getObjectHandler } from "./getHandler";
import { SharedProxyHandler } from "./SharedProxyHandler";
import { FunctionProxyHandler } from "./FunctionProxyHandler";
import { isNil } from "@shared";
import { unproxify } from "../../utils/unproxify";

export class PrimitiveProxyHandler<T>
  extends SharedProxyHandler<T>
  implements ProxyHandlerPort<T>
{
  apply(target: ProxiedValuePort<T>, _, args: any[]) {
    if (args.length > 0) {
      const value = unproxify(args[0]);
      switch (typeof value) {
        // Intentional order
        case "function": {
          return this.updateHandlerAndValue(
            target,
            value,
            new FunctionProxyHandler(this.rootObservableCallback),
          );
        }
        // biome-ignore-start lint/suspicious/noFallthroughSwitchClause: Intentional
        case "object":
          // Ignore null
          if (value) {
            const newHandler = getObjectHandler(
              value,
              this.parentSubscription,
              this.rootObservableCallback,
            );
            if (newHandler)
              return this.updateHandlerAndValue(target, value, newHandler);
          }
        // biome-ignore-end lint/suspicious/noFallthroughSwitchClause: Intentional
        // If its an non observable object continue
        default:
          this.applyNewValue(target, value);
      }
      return;
    }
    return target.valueOf();
  }
  applyNewValue(target: ProxiedValuePort<T>, unproxifiedValue: T) {
    const oldValue = target.$value;
    target.$value = unproxifiedValue;

    if (unproxifiedValue !== oldValue) target.notifyCurrentValue();
  }

  get(target: ProxiedValuePort<T>, p: string | symbol, receiver) {
    if (p in target) return Reflect.get(target, p, receiver);
    // Trying to get a property on an nil value will return an object with a nil property
    if (isNil(target.$value))
      this.updateHandlerAndValue(target, { [p]: undefined });
    return target.$value[p];
  }
}
