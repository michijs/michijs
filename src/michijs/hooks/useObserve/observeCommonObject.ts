import { useObserveInternal } from "../useObserve";
import type { ObservableType, Subscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import { cloneCommonObject } from "../../utils/clone/cloneCommonObject";
import {
  customObjectApply,
  customObjectDelete,
  customObjectGet,
  customObjectGetOwnPropertyDescriptor,
  customObjectHas,
  customObjectOwnKeys,
  customObjectSet,
} from "./customHandlers";

export function observeCommonObject<T>(
  item: T,
  initialObservers?: Subscription<T>[],
  rootObservableCallback?: () => ObservableType<any>,
): ObservableType<T> {
  const newInitialObservers = [
    ...(initialObservers ?? []),
    () => newObservable.notifyCurrentValue(),
  ];
  const newObservable = new ProxiedValue<T>(
    item && Object.getPrototypeOf(item) === Object.prototype
      ? cloneCommonObject(item, (value) =>
          useObserveInternal<any>(
            value,
            newInitialObservers,
            rootObservableCallback,
          ),
        )
      : item,
    initialObservers,
  );
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers, rootObservableCallback),
    deleteProperty: customObjectDelete,
    apply: customObjectApply(
      () => proxy,
      newInitialObservers,
      rootObservableCallback,
    ),
    ownKeys: customObjectOwnKeys,
    getOwnPropertyDescriptor: customObjectGetOwnPropertyDescriptor,
    get: customObjectGet(newInitialObservers, rootObservableCallback),
    has: customObjectHas,
  }) as unknown as ObservableType<T>;
  return proxy;
}
