import { useObserveInternal } from "../useObserve";
import type { ObservableType, ParentSubscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import { cloneCommonObject } from "../../utils/clone/cloneCommonObject";
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

export function observeCommonObject<T>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>,
): ObservableType<T> {
  const newParentSubscription = createParentSubscription(() => newObservable);
  const newObservable = new ProxiedValue<T>(
    item && Object.getPrototypeOf(item) === Object.prototype
      ? cloneCommonObject(item, (value) =>
          useObserveInternal<any>(
            value,
            newParentSubscription,
            rootObservableCallback,
          ),
        )
      : item,
    parentSubscription,
  );
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newParentSubscription, rootObservableCallback),
    deleteProperty: customObjectDelete,
    apply: customObjectApply(
      () => proxy,
      newParentSubscription,
      rootObservableCallback,
    ),
    ownKeys: customObjectOwnKeys,
    getOwnPropertyDescriptor: customObjectGetOwnPropertyDescriptor,
    get: customObjectGet(newParentSubscription, rootObservableCallback),
    has: customObjectHas,
  }) as unknown as ObservableType<T>;
  return proxy;
}
