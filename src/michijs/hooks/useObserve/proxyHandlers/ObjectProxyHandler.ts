import { ProxiedValue } from "../../../classes/ProxiedValue";
import type { ObservableType, ParentSubscription } from "../../../types";
import { setObservableValue } from "../../../utils/setObservableValue";
import { useComputedObserve } from "../../useComputedObserve";
import { useObserveInternal } from "../../useObserve";

export class ObjectProxyHandler<T> implements ProxyHandler<ProxiedValue<T>> {
  proxy: () => ObservableType<any>;
  parentSubscription?: ParentSubscription<any>;
  rootObservableCallback?: () => ObservableType<any>;

  constructor(
    proxy: () => ObservableType<any>,
    rootObservableCallback?: () => ObservableType<any>,
    parentSubscription?: ParentSubscription<any>,
  ) {
    this.proxy = proxy;
    this.rootObservableCallback = rootObservableCallback;
    this.parentSubscription = parentSubscription;
  }

  set(target, property, newValue, receiver) {
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
        this.parentSubscription,
        this.rootObservableCallback?.(),
      );
      const result = Reflect.set(target.$value, property, newItem);
      // @ts-ignore
      newItem.notifyCurrentValue?.();
      return result;
    }
    return false;
  }

  deleteProperty(target, property) {
    if (property in target) return Reflect.deleteProperty(target, property);
    const deletedProperty = target.$value[property];
    if (deletedProperty) {
      Reflect.set(deletedProperty, "$value", undefined);
      // const result = Reflect.deleteProperty(target.$value, property);
      // deletedProperty.$value = undefined;

      return true;
    }
    return false;
  }

  apply(target, _, args) {
    // TODO: Tried using target instead of proxy() but for some reason it mutates the proxy itself. Test with toggle fieldest on a11y tests
    const valueType = typeof target.$value;
    if (valueType === "function" && !(target.$value instanceof ProxiedValue)) {
      if (this.rootObservableCallback)
        return useComputedObserve(
          () => this.proxy().$value(...args),
          [this.rootObservableCallback()],
        );
      // else return target.$value(...args);
      else return this.proxy().$value(...args);
    }
    if (args.length > 0) {
      const newValue = args[0];
      setObservableValue(
        this.proxy(),
        newValue,
        this.parentSubscription,
        this.rootObservableCallback,
      );
      return;
    }
    return target.valueOf();
  }

  ownKeys(
    target,
  ) {
    return Reflect.ownKeys(target.$value as object);
  }

  getOwnPropertyDescriptor(target, prop) {
    return {
      ...Reflect.getOwnPropertyDescriptor(target, prop),
      enumerable: true,
      configurable: true,
    };
  }

  has(
    target,
    property,
  ) {
    return (this.ownKeys(target) as Array<string | symbol>).includes(
      property,
    );
  }

  get(target, p, receiver) {
    // Because function already has length
    if (p in target) return Reflect.get(target, p, receiver);
    // Can be 0
    if (target.$value !== undefined) {
      // For example Date, array, etc - primitive types dont work with reflect and it is necessary for objects
      if (typeof target.$value === "object") {
        if (p in target.$value)
          return Reflect.get(target.$value, p, target.$value);
        else
          // Reflect doesnt work properly here
          this.set(
            target,
            p,
            undefined,
            receiver,
          );
      }
      // If a nested object is undefined
    } else {
      target.$value = {};
      // Reflect doesnt work properly here
      this.set(
        target,
        p,
        undefined,
        receiver,
      );
    }

    return target.$value[p];
  }
}

