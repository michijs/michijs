import { useObserveInternal } from "../useObserve";
import type { ObservableType, Subscription } from "../../types";
import {
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
  initialObservers: Subscription<T>[] | undefined,
  rootObservableCallback?: () => ObservableType<any>,
) {
  const newInitialObservers = [
    ...(initialObservers ?? []),
    () => newObservable.notifyCurrentValue(),
  ];
  const proxiedArray = cloneArray(item, (value) =>
    useObserveInternal<any>(value, newInitialObservers, rootObservableCallback),
  );

  const newObservable = new ProxiedArray<T>(
    proxiedArray,
    initialObservers as Subscription<any[]>[],
  );
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers, rootObservableCallback),
    deleteProperty: customObjectDelete,
    ownKeys: customObjectOwnKeys,
    apply: customObjectApply(
      () => proxy,
      newInitialObservers,
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
                newInitialObservers,
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
                newInitialObservers,
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
                  newInitialObservers,
                  rootObservableCallback,
                ),
              ),
            ]);
            return result;
          };
        }
      }
      return customObjectGet(newInitialObservers, rootObservableCallback)(
        target,
        p,
        receiver,
      );
    },
  });

  return proxy as unknown as ObservableType<T>;
}
