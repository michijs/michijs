import { useObserve } from "../useObserve";
import {
  ProxiedArrayInterface,
  ObservableType,
  Subscription,
} from "../../types";
import { ProxiedArray } from "../../classes";
import {
  customObjectApply,
  customObjectDelete,
  customObjectGet,
  customObjectGetOwnPropertyDescriptor,
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

  const newObservable = new ProxiedArray<unknown>(proxiedArray);
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers),
    deleteProperty: customObjectDelete,
    ownKeys: customObjectOwnKeys,
    apply: customObjectApply(newInitialObservers),
    getOwnPropertyDescriptor(target, prop) {
      return prop !== "length"
        ? customObjectGetOwnPropertyDescriptor(target, prop)
        : Reflect.getOwnPropertyDescriptor(target, prop);
    },
    get(target, p, receiver) {
      const castedP = p as unknown as keyof ProxiedArrayInterface<T>;
      if (
        typeof castedP === "string" &&
        mutableNewItemsProperties.has(castedP)
      ) {
        const targetProperty = Reflect.get(target, p);
        return (...args: T[]) => {
          const proxiedArray = args.map((value) =>
            useObserve<any>(value, newInitialObservers),
          );
          const result = targetProperty.apply(target, proxiedArray);
          return result;
        };
      } else return customObjectGet(() => proxy)(target, p, receiver);
    },
  });

  return proxy as ObservableType<T>;
}
