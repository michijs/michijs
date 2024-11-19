import type { ProxiedArray } from "../../../classes/ProxiedValue";
import { useObserveInternal } from "../../useObserve";
import { ObjectProxyHandler } from "./ObjectProxyHandler";


const mutableNewItemsProperties = new Set<
  keyof InstanceType<typeof ProxiedArray>
>(["push", "$replace", "unshift"]);

export class ArrayProxyHandler<T> extends ObjectProxyHandler<T> {

  // @ts-ignore
  override getOwnPropertyDescriptor(target, prop) {
    // Otherwise length is listed as a property
    return prop !== "length"
      ? super.getOwnPropertyDescriptor(target, prop)
      : (Reflect.getOwnPropertyDescriptor(target, prop));
  }
  override get(target, p, receiver) {
    const castedP = p as unknown as keyof InstanceType<typeof ProxiedArray>;
    if (typeof castedP === "string") {
      if (mutableNewItemsProperties.has(castedP)) {
        const targetProperty = Reflect.get(target, p) as Function;
        return (...args: T[]) => {
          const proxiedArray = args.map((value) =>
            useObserveInternal<any>(
              value,
              this.parentSubscription,
              this.rootObservableCallback,
            ),
          );
          const result = targetProperty.apply(target, proxiedArray);
          return result;
        };
      }
      if (castedP === "fill") {
        const targetProperty = Reflect.get(target, p) as Function;
        return (value, start, end) => {
          const result = targetProperty.apply(target, [
            useObserveInternal<any>(
              value,
              this.parentSubscription,
              this.rootObservableCallback,
            ),
            start,
            end,
          ]);
          return result;
        };
      }
      if (castedP === "splice") {
        const targetProperty = Reflect.get(target, p) as Function;
        return (start, deleteCount, ...items) => {
          const result = targetProperty.apply(target, [
            start,
            deleteCount,
            ...items.map((x) =>
              useObserveInternal<any>(
                x,
                this.parentSubscription,
                this.rootObservableCallback,
              ),
            ),
          ]);
          return result;
        };
      }
    }
    return super.get(
      target,
      p,
      receiver,
    );
  }
}