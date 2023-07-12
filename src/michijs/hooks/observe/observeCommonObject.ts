import { deepEqual } from "../../utils/deepEqual";
import { observe } from "../observe";
import { Observable } from "../../types";
import { ProxiedValue } from "./ProxiedValue";

type CommonObjectProxyHandler<T extends object> = Required<ProxyHandler<ProxiedValue<T>>>

export const customObjectSet: CommonObjectProxyHandler<object>["set"] = (target, property, newValue, receiver) => {
  if (property in target)
    return Reflect.set(target, property, newValue, receiver);
  if (target.$value) {
    const oldValue = target.$value[property];

    const updateCallback = (value: object) => {
      const observedItem = observe<object>(newValue);

      observedItem.observers = oldValue.observers;
      // Intentionally ignoring receiver - it ignores target.$value as the target and takes target 
      const result = Reflect.set(value, property, observedItem);

      observedItem.notify?.();
      return result;
    }

    if (target.$value[property].shouldCheckForChanges()) {
      if (!deepEqual(newValue, oldValue))
        return updateCallback(target.$value);
    } else
      return updateCallback(target.$value);
    return true;
  }
  return false;
}

export const customObjectDelete: CommonObjectProxyHandler<object>["deleteProperty"] = (target, property) => {
  if (property in target)
    return Reflect.deleteProperty(target, property);
  if (target.$value) {
    const deletedProperty = target.$value[property];
    const result = Reflect.deleteProperty(target.$value, property)
    deletedProperty.$value = undefined;

    return result;
  }
  return false;
};

export const observeCommonObject = <T extends object>(
  item: T): Observable<T> => {
  const newObservable = new ProxiedValue<T>(
    Object.entries(item).reduce((previousValue, [key, value]) => {
      const observedItem = observe(
        value
      );
      previousValue[key] = observedItem;
      return previousValue;
    }, {}) as T
  );
  return new Proxy(newObservable, {
    set: customObjectSet,
    deleteProperty: customObjectDelete,
    get(target, p, receiver) {
      return Reflect.get(p in target ? target : target.$value, p, receiver);
    },
  }) as unknown as Observable<T>;
};
