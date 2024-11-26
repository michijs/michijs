import type { ProxiedValue } from "../../classes/ProxiedValue";
import type { ObservableProxyHandler } from "../../types";
import { getObjectHandler } from "./getHandler";
import { SharedProxyHandler } from "./SharedProxyHandler";
import { FunctionProxyHandler } from "./FunctionProxyHandler";
import { isNil } from "../../utils";
import { getValue } from "./getValue";

export class PrimitiveProxyHandler<T>
  extends SharedProxyHandler<T>
  implements ObservableProxyHandler<ProxiedValue<T>, T>
{
  apply(target: ProxiedValue<T>, _, args: any[]) {
    if (args.length > 0) {
      const value = getValue(args[0]);
      switch (typeof value) {
        // Intentional order
        // TODO: check this
        case "function": {
          return this.updateHandlerAndValue(
            target,
            value,
            new FunctionProxyHandler(this.rootObservableCallback),
          );
        }
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
        // If its an non observable object continue
        default:
          this.applyNewValue(target, value);
      }
      return;
    }
    return target.valueOf();
  }
  applyNewValue(target: ProxiedValue<T>, unproxifiedValue: T) {
    const oldValue = target.$value;
    target.$value = unproxifiedValue;

    if (unproxifiedValue !== oldValue) target.notifyCurrentValue();
  }

  get(target: ProxiedValue<T>, p: string | symbol, receiver) {
    if (p in target) return Reflect.get(target, p, receiver);
    // Trying to get a property on an nil value will return an object with a nil property
    if (isNil(target.$value))
      this.updateHandlerAndValue(target, { [p]: undefined });
    return target.$value[p];
  }
}
