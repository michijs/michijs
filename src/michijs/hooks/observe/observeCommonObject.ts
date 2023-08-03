import { observe } from "../observe";
import { Observable, ObserverCallback } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";

type CommonObjectProxyHandler<T extends object> = Required<
  ProxyHandler<ProxiedValue<T>>
>;

export const customObjectSet = <T extends object>(initialObservers?: Set<ObserverCallback<unknown>>): CommonObjectProxyHandler<T>["set"] => (
  target,
  property,
  newValue,
  receiver,
) => {
  if (property in target)
    return Reflect.set(target, property, newValue, receiver);
  if (target.$value) {
    const observedItem = observe<object>(newValue, initialObservers);
    // Intentionally ignoring receiver - it ignores target.$value as the target and takes target
    return Reflect.set(target.$value[property], '$value', observedItem.$value);
  }
  return false;
};

export const customObjectDelete = <T extends object>(): CommonObjectProxyHandler<T>["deleteProperty"] =>
  (target, property) => {
    if (property in target) return Reflect.deleteProperty(target, property);
    if (target.$value) {
      const deletedProperty = target.$value[property];
      const result = Reflect.deleteProperty(target.$value, property);
      deletedProperty.$value = undefined;

      return result;
    }
    return false;
  };

export const observeCommonObject = <T extends object>(
  item: T, initialObservers?: Set<ObserverCallback<unknown>>
): Observable<T> => {
  const newObservable = new ProxiedValue<T>(
    Object.entries(item).reduce((previousValue, [key, value]) => {
      const observedItem = observe(value, initialObservers);
      previousValue[key] = observedItem;
      return previousValue;
    }, {}) as T,
  );
  return new Proxy(newObservable, {
    set: customObjectSet(initialObservers),
    deleteProperty: customObjectDelete(),
    get(target, p, receiver) {
      return Reflect.get(p in target ? target : target.$value, p, receiver);
    }
  }) as unknown as Observable<T>;
};
