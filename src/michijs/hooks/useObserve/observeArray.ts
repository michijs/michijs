import { useObserve } from "../useObserve";
import { ObservableArray, ObservableType, ObserverCallback } from "../../types";
import { ProxiedArray } from "../../classes";
import {
  customObjectDelete,
  customObjectGet,
  customObjectGetOwnPropertyDescriptor,
  customObjectOwnKeys,
  customObjectSet,
} from "./observeCommonObject";

const mutableProperties = new Set(["push", "$replace"]);

export function observeArray<T extends Array<unknown>>(
  item: T,
  initialObservers: ObserverCallback<T>[] = [],
) {
  const newInitialObservers = [
    ...initialObservers,
    () => {
      newObservable.notifyCurrentValue();
    },
  ];
  const proxiedArray = item.map((value) =>
    useObserve<any>(value, newInitialObservers),
  );

  const newObservable = new ProxiedArray<unknown>(proxiedArray);
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers),
    deleteProperty: customObjectDelete,
    ownKeys: customObjectOwnKeys,
    getOwnPropertyDescriptor(target, prop) {
      return prop !== 'length' ? customObjectGetOwnPropertyDescriptor(target, prop) : Reflect.getOwnPropertyDescriptor(target, prop);
    },
    get(target, p, receiver) {
      const castedP = p as unknown as keyof ObservableArray<T>;
      if (typeof castedP === "string" && mutableProperties.has(castedP)) {
        const targetProperty = Reflect.get(target, p);
        return function (...args: T[]) {
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
