import { useObserve } from "../useObserve";
import { ObservableType, Subscription } from "../../types";
import { ProxiedValue } from "../../classes";
import { setObservableValue } from "../../utils";

type CommonObjectProxyHandler<T extends object> = Required<
  ProxyHandler<ProxiedValue<T>>
>;

export const customObjectSet =
  <T>(
    initialObservers: Subscription<T>[],
  ): CommonObjectProxyHandler<any>["set"] =>
    (target, property, newValue, receiver) => {
      if (property in target)
        return Reflect.set(target, property, newValue, receiver);
      if (target.$value) {
        // const observedItem = observe<object>(newValue, initialObservers);
        // Intentionally ignoring receiver - it ignores target.$value as the target and takes target
        //   return Reflect.set(target.$value[property], '$value', observedItem.$value)
        // console.log(target, target.$value, target.$value[property])

        if (target.$value[property])
          return setObservableValue(
            target.$value[property],
            newValue,
            initialObservers,
          );
        else {
          const newItem = useObserve(newValue, initialObservers);
          const result = Reflect.set(target.$value, property, newItem);
          newItem.notifyCurrentValue?.();
          return result;
        }
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
    proxy: () => T,
  ): CommonObjectProxyHandler<any>["get"] =>
    (target, p, receiver) => {
      // Because function already has length
      if (p === 'length' && target.$value?.[p]) return target.$value[p];

      if (p in target) return Reflect.get(target, p, receiver);
      else if (target.$value) {
        if (typeof target.$value === "object")
          if (p in target.$value) return Reflect.get(target.$value, p, receiver);
          else proxy()[p] = undefined;
        else if (target.$value[p]) return target.$value[p];
      }
      return proxy()[p];
    };

const functionProps = ['arguments', 'caller', 'prototype'];

export const customObjectOwnKeys: CommonObjectProxyHandler<any>["ownKeys"] = (
  target,
) => {
  return Reflect.ownKeys(target.$value as object).concat(...functionProps);
};
export const customObjectGetOwnPropertyDescriptor: CommonObjectProxyHandler<any>["getOwnPropertyDescriptor"] =
  (target, prop) => {
    return functionProps.includes(prop as string) ? Reflect.getOwnPropertyDescriptor(target, prop) : {
      ...Reflect.getOwnPropertyDescriptor(target, prop),
      enumerable: true,
      configurable: true,
    };
  };

export const customObjectApply: <T>(
  initialObservers: Subscription<T>[],
) => CommonObjectProxyHandler<any>["apply"] =
  initialObservers => (target, _, args) => {
    const newValue = args[0];
    if (newValue !== undefined) {
      if (typeof target.$value === "object")
        setObservableValue(
          target,
          newValue,
          initialObservers as Subscription<ProxiedValue<any>>[],
        )
      else target.$value = newValue;
      return;
    }
    // @ts-ignore
    return target.valueOf()
  };

export function observeCommonObject<T extends unknown>(
  item: T,
  initialObservers: Subscription<T>[] = [],
): ObservableType<T> {
  const newInitialObservers = [
    ...initialObservers,
    () => {
      newObservable.notifyCurrentValue();
    },
  ];
  const newObservable = new ProxiedValue<T>(
    item && Object.getPrototypeOf(item) === Object.prototype
      ? (Object.entries(item).reduce((previousValue, [key, value]) => {
        const observedItem = useObserve<any>(value, newInitialObservers);
        previousValue[key] = observedItem;
        return previousValue;
      }, {}) as T)
      : item,
    initialObservers,
  );
  const proxy = new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers),
    deleteProperty: customObjectDelete,
    apply: customObjectApply(newInitialObservers),
    ownKeys: customObjectOwnKeys,
    getOwnPropertyDescriptor: customObjectGetOwnPropertyDescriptor,
    get: customObjectGet(() => proxy),
  }) as unknown as ObservableType<T>;
  return proxy;
}