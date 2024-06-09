import { useObserve } from "../useObserve";
import type { ObservableType, Subscription } from "../../types";
import { ProxiedValue } from "../../classes";
import { cloneCommonObject, setObservableValue } from "../../utils";

type CommonObjectProxyHandler<T extends object> = Required<
  ProxyHandler<ProxiedValue<T>>
>;

export const customObjectSet =
  <T>(
    initialObservers: Subscription<T>[],
  ): CommonObjectProxyHandler<any>["set"] =>
  (target, property, newValue, receiver) => {
    if (!["length", "name"].includes(property as string) && property in target)
      return Reflect.set(target, property, newValue, receiver);

    // Not sure if this is possible today
    if (target.$value) {
      const oldValue = target.$value[property];
      if (oldValue) {
        // If you call something.myfunctionname = other function it should not call the function
        if (typeof oldValue.$value === "function") oldValue.$value = newValue;
        else oldValue(newValue);
        return true;
      } else {
        const newItem = useObserve(newValue, initialObservers);
        const result = Reflect.set(target.$value, property, newItem);
        // @ts-ignore
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
    initialObservers: Subscription<T>[],
  ): CommonObjectProxyHandler<any>["get"] =>
  (target, p, receiver) => {
    // Because function already has length
    if (!["length", "name"].includes(p as string) && p in target) {
      return Reflect.get(target, p, receiver);
    } else if (target.$value) {
      if (typeof target.$value === "object")
        if (p in target.$value)
          return Reflect.get(target.$value, p, target.$value);
        else customObjectSet(initialObservers)(target, p, undefined, receiver);
      else if (target.$value[p]) return target.$value[p];
      // If a nested object is undefined
    } else {
      target.$value = {};
      customObjectSet(initialObservers)(target, p, undefined, receiver);
    }

    return target.$value[p];
  };

const functionProps = ["arguments", "caller", "prototype"];

export const customObjectOwnKeys: CommonObjectProxyHandler<any>["ownKeys"] = (
  target,
) => {
  return Reflect.ownKeys(target.$value as object).concat(...functionProps);
};
export const customObjectGetOwnPropertyDescriptor: CommonObjectProxyHandler<any>["getOwnPropertyDescriptor"] =
  (target, prop) => {
    return functionProps.includes(prop as string)
      ? Reflect.getOwnPropertyDescriptor(target, prop)
      : {
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
  initialObservers: Subscription<any>[],
) => CommonObjectProxyHandler<any>["apply"] =
  (proxy, initialObservers) => (target, _, args) => {
    const valueType = typeof target.$value;
    if (valueType === "function") return proxy().$value(...args);
    else if (args.length > 0) {
      const newValue = args[0];
      if (target.$value && valueType === "object")
        setObservableValue(proxy(), newValue, initialObservers);
      else proxy().$value = useObserve(newValue, initialObservers).$value;
      return;
    }
    return target.valueOf();
  };

export function observeCommonObject<T>(
  item: T,
  initialObservers: Subscription<T>[] = [],
): ObservableType<T> {
  const newInitialObservers = [
    ...initialObservers,
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
