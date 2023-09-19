import { useObserve } from "../useObserve";
import { ObservableType, ObserverCallback } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import { setObservableValue } from "../../utils/setObservableValue";

type CommonObjectProxyHandler<T extends object> = Required<
  ProxyHandler<ProxiedValue<T>>
>;

export const customObjectSet = <T>(initialObservers: ObserverCallback<T>[]): CommonObjectProxyHandler<any>["set"] =>
  (target, property, newValue, receiver) => {
    if (property in target)
      return Reflect.set(target, property, newValue, receiver);
    if (target.$value) {
      // const observedItem = observe<object>(newValue, initialObservers);
      // Intentionally ignoring receiver - it ignores target.$value as the target and takes target
      //   return Reflect.set(target.$value[property], '$value', observedItem.$value)
      // console.log(target, target.$value, target.$value[property])

      if (target.$value[property])
        return setObservableValue(target.$value[property], newValue, initialObservers);
      else {
        const result = Reflect.set(target.$value, property, useObserve(newValue, initialObservers));
        target.notify(target.$value)
        return result
      }
    }
    return false;
  };

export const customObjectDelete: CommonObjectProxyHandler<any>["deleteProperty"] =
  (target, property) => {
    if (property in target) return Reflect.deleteProperty(target, property);
    if (target.$value) {
      const deletedProperty = target.$value[property];
      // const result = Reflect.deleteProperty(target.$value, property);
      deletedProperty.$value = undefined;

      return true;
    }
    return false;
  };

export function observeCommonObject<T extends object>(
  item: T,
  initialObservers: ObserverCallback<T>[] = []
): ObservableType<T> {
  const newInitialObservers = [...initialObservers, () => {
    newObservable.notifyCurrentValue()
  }]
  const newObservable = new ProxiedValue<T>(
    Object.entries(item).reduce((previousValue, [key, value]) => {
      const observedItem = useObserve(value, newInitialObservers);
      previousValue[key] = observedItem;
      return previousValue;
    }, {}) as T,
    initialObservers
  );
  return new Proxy(newObservable, {
    set: customObjectSet(newInitialObservers),
    deleteProperty: customObjectDelete,
    get(target, p, receiver) {
      if (p in target)
        return Reflect.get(target, p, receiver);
      else if (p in target.$value)
        return Reflect.get(target.$value, p, receiver)
      else {
        console.log(target.$value, p)
        Reflect.set(target.$value, p, useObserve(undefined, newInitialObservers), receiver)
      }
      return Reflect.get(target.$value, p, receiver);
    },
  }) as unknown as ObservableType<T>;
};
