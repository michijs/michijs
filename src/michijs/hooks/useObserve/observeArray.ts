import { useObserveInternal } from "../useObserve";
import type { ObservableType, ParentSubscription } from "../../types";
import {
  createParentSubscription,
  customObjectApply,
  customObjectDelete,
  customObjectGet,
  customObjectGetOwnPropertyDescriptor,
  customObjectHas,
  customObjectOwnKeys,
  customObjectSet,
} from "./customHandlers";
import { cloneArray } from "../../utils/clone/cloneArray";
import { ProxiedArray } from "../../classes/ProxiedValue";

const mutableNewItemsProperties = new Set<
  keyof InstanceType<typeof ProxiedArray>
>(["push", "$replace", "unshift"]);

export function observeArray<T extends Array<unknown>>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>,
) {
  const newParentSubscription = createParentSubscription(() => newObservable);
  const proxiedArray = cloneArray(item, (value) =>
    useObserveInternal<any>(
      value,
      newParentSubscription,
      rootObservableCallback,
    ),
  );

  const newObservable = new ProxiedArray<T>(proxiedArray, parentSubscription);
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newParentSubscription, rootObservableCallback),
    deleteProperty: customObjectDelete,
    ownKeys: customObjectOwnKeys,
    apply: customObjectApply(
      () => proxy,
      newParentSubscription,
      rootObservableCallback,
    ),
    getOwnPropertyDescriptor(target, prop) {
      return prop !== "length"
        ? customObjectGetOwnPropertyDescriptor(target, prop)
        : Reflect.getOwnPropertyDescriptor(target, prop);
    },
    // Fixes calling iterable methods like forEach
    has: customObjectHas,
    get(target, p, receiver) {
      const castedP = p as unknown as keyof InstanceType<typeof ProxiedArray>;
      if (typeof castedP === "string") {
        if (mutableNewItemsProperties.has(castedP)) {
          const targetProperty = Reflect.get(target, p) as Function;
          return (...args: T[]) => {
            const proxiedArray = args.map((value) =>
              useObserveInternal<any>(
                value,
                newParentSubscription,
                rootObservableCallback,
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
                newParentSubscription,
                rootObservableCallback,
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
                  newParentSubscription,
                  rootObservableCallback,
                ),
              ),
            ]);
            return result;
          };
        }
      }
      return customObjectGet(newParentSubscription, rootObservableCallback)(
        target,
        p,
        receiver,
      );
    },
  });

  return proxy as unknown as ObservableType<T>;
}
