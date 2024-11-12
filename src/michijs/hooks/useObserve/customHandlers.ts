import { ProxiedValue } from "../../classes/ProxiedValue";
import type { ObservableType, ParentSubscription } from "../../types";
import { setObservableValue } from "../../utils/setObservableValue";
import { useComputedObserve } from "../useComputedObserve";
import { useObserveInternal } from "../useObserve";

type CommonObjectProxyHandler<T extends object> = Required<
  ProxyHandler<ProxiedValue<T>>
>;

export const customObjectSet =
  <T>(
    parentSubscription: ParentSubscription<T>,
    rootObservableCallback?: () => ObservableType<any>,
  ): CommonObjectProxyHandler<any>["set"] =>
    (target, property, newValue, receiver) => {
      if (property in target)
        return Reflect.set(target, property, newValue, receiver);

      // Not sure if this is possible today
      if (target.$value) {
        const oldValue = target.$value[property];
        if (oldValue) {
          // If you call something.myfunctionname = other function it should not call the function
          if (
            typeof oldValue.$value === "function" &&
            !(oldValue.$value instanceof ProxiedValue)
          )
            oldValue.$value = newValue;
          else oldValue(newValue);
          return true;
        }
        const newItem = useObserveInternal(
          newValue,
          parentSubscription,
          rootObservableCallback?.(),
        );
        const result = Reflect.set(target.$value, property, newItem);
        // @ts-ignore
        newItem.notifyCurrentValue?.();
        return result;
      }
      return false;
    };

export const customObjectDelete: CommonObjectProxyHandler<any>["deleteProperty"] =
  (target, property) => {
    if (property in target) return Reflect.deleteProperty(target, property);
    const deletedProperty = target.$value[property];
    if (deletedProperty) {
      Reflect.set(deletedProperty, "$value", undefined);
      // const result = Reflect.deleteProperty(target.$value, property);
      // deletedProperty.$value = undefined;

      return true;
    }
    return false;
  };

export const customObjectGet =
  <T extends ObservableType<any>>(
    parentSubscription: ParentSubscription<T>,
    rootObservableCallback?: () => ObservableType<any>,
  ): CommonObjectProxyHandler<any>["get"] =>
    (target, p, receiver) => {
      // Because function already has length
      if (p in target) 
        return Reflect.get(target, p, receiver);
      // Can be 0
      if (target.$value !== undefined) {
        // For example Date, array, etc - primitive types dont work with reflect and it is necessary for objects
        if (typeof target.$value === "object") {
          if (p in target.$value)
            return Reflect.get(target.$value, p, target.$value);
          else
            customObjectSet(parentSubscription, rootObservableCallback)(
              target,
              p,
              undefined,
              receiver,
            );
        }
        // If a nested object is undefined
      } else {
        target.$value = {};
        customObjectSet(parentSubscription, rootObservableCallback)(
          target,
          p,
          undefined,
          receiver,
        );
      }

      return target.$value[p];
    };

export const customObjectOwnKeys: CommonObjectProxyHandler<any>["ownKeys"] = (
  target,
) => {
  return Reflect.ownKeys(target.$value as object);
};
export const customObjectGetOwnPropertyDescriptor: CommonObjectProxyHandler<any>["getOwnPropertyDescriptor"] =
  (target, prop) => {
    return {
      ...Reflect.getOwnPropertyDescriptor(target, prop),
      enumerable: true,
      configurable: true,
    };
  };
export const customObjectHas: CommonObjectProxyHandler<any>["has"] = (
  target,
  property,
) => {
  return (customObjectOwnKeys(target) as Array<string | symbol>).includes(
    property,
  );
};

export const customObjectApply: (
  // Using proxy instead of target because otherwise it does not trap gets and sets
  proxy: () => ObservableType<any>,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>,
) => CommonObjectProxyHandler<any>["apply"] =
  (proxy, parentSubscription, rootObservableCallback) => (target, _, args) => {
    const valueType = typeof target.$value;
    if (valueType === "function" && !(target.$value instanceof ProxiedValue)) {
      if (rootObservableCallback)
        return useComputedObserve(
          () => proxy().$value(...args),
          [rootObservableCallback()],
        );
      else return proxy().$value(...args);
    }
    if (args.length > 0) {
      const newValue = args[0];
      if (target.$value && valueType === "object")
        setObservableValue(
          proxy(),
          newValue,
          parentSubscription as ParentSubscription<any>,
          rootObservableCallback,
        );
      else
        proxy().$value = useObserveInternal(
          newValue,
          parentSubscription,
          rootObservableCallback,
        ).$value;
      return;
    }
    return target.valueOf();
  };

export const createParentSubscription = <T>(
  proxiedValue: () => ProxiedValue<T>,
): ParentSubscription<T> => {
  const subscription: ParentSubscription<T> = () =>
    proxiedValue().notifyCurrentValue();
  subscription.shouldNotify = () => proxiedValue().notifiableObservers;
  return subscription;
};
