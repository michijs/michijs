import { useObserve } from "../useObserve";
import {
  ProxiedArrayInterface,
  type ObservableType,
  type Subscription,
} from "../../types";
import { ProxiedArray } from "../../classes";
import {
  customObjectApply,
  customObjectDelete,
  customObjectGet,
  customObjectGetOwnPropertyDescriptor,
  customObjectHas,
  customObjectOwnKeys,
  customObjectSet,
} from "./observeCommonObject";
import { cloneArray } from "../../utils";

const mutableNewItemsProperties = new Set<
  keyof InstanceType<typeof ProxiedArray>
>(["push", "$replace", "unshift"]);

export function observeArray<T extends Array<unknown>>(
  item: T,
  initialObservers: Subscription<T>[] = [],
) {
  const newInitialObservers = [
    ...initialObservers,
    () => newObservable.notifyCurrentValue(),
  ];
  const proxiedArray = cloneArray(item, (value) =>
    useObserve<any>(value, newInitialObservers),
  );

  const newObservable = new ProxiedArray<T>(proxiedArray);
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers),
    deleteProperty: customObjectDelete,
    ownKeys: customObjectOwnKeys,
    apply: customObjectApply(() => proxy, newInitialObservers),
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
              useObserve<any>(value, newInitialObservers),
            );
            const result = targetProperty.apply(target, proxiedArray);
            return result;
          };
        } else if (castedP === "fill") {
          const targetProperty = Reflect.get(target, p) as Function;
          return (value, start, end) => {
            const result = targetProperty.apply(target, [
              useObserve<any>(value, newInitialObservers),
              start,
              end,
            ]);
            return result;
          };
        } else if (castedP === "splice") {
          const targetProperty = Reflect.get(target, p) as Function;
          return (start, deleteCount, ...items) => {
            const result = targetProperty.apply(target, [
              start,
              deleteCount,
              ...items.map((x) => useObserve<any>(x, newInitialObservers)),
            ]);
            return result;
          };
        }
      }
      return customObjectGet(newInitialObservers)(target, p, receiver);
    },
  });

  return proxy as unknown as ObservableType<T>;
}
