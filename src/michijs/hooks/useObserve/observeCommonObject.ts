import { useObserve } from "../useObserve";
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
): ObservableType<T> {
  const newInitialObservers = [
    ...(initialObservers ?? []),
    () => newObservable.notifyCurrentValue(),
  ];
  const newObservable = new ProxiedValue<T>(
    item && Object.getPrototypeOf(item) === Object.prototype
      ? cloneCommonObject(item, (value) =>
          useObserve<any>(value, newInitialObservers),
        )
      : item,
    initialObservers,
  );
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers),
    deleteProperty: customObjectDelete,
    apply: customObjectApply(() => proxy, newInitialObservers),
    ownKeys: customObjectOwnKeys,
    getOwnPropertyDescriptor: customObjectGetOwnPropertyDescriptor,
    get: customObjectGet(newInitialObservers),
    has: customObjectHas,
  }) as unknown as ObservableType<T>;
  return proxy;
}
