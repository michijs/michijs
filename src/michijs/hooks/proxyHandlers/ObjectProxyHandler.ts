import { ProxiedValueV2 } from "../../classes/ProxiedValue";
import type { ObservableType, ParentSubscription } from "../../types";

export class ObjectProxyHandler<T> implements ProxyHandler<ProxiedValueV2<T>> {
  parentSubscription?: ParentSubscription<any>;
  rootObservableCallback?: () => ObservableType<any>;

  constructor(
    parentSubscription?: ParentSubscription<any>, rootObservableCallback?: () => ObservableType<any>
  ) {
    this.parentSubscription = parentSubscription;
    this.rootObservableCallback = rootObservableCallback;
  }

  // set(target, property, newValue, receiver) {
  //   if (property in target)
  //     return Reflect.set(target, property, newValue, receiver);

  //   // Not sure if this is possible today
  //   if (target.$value) {
  //     const oldValue = target.$value[property];
  //     if (oldValue) {
  //       // If you call something.myfunctionname = other function it should not call the function
  //       if (
  //         typeof oldValue.$value === "function" &&
  //         !(oldValue.$value instanceof ProxiedValue)
  //       )
  //         oldValue.$value = newValue;
  //       else oldValue(newValue);
  //       return true;
  //     }
  //     const newItem = useObserveInternal(
  //       newValue,
  //       this.parentSubscription,
  //       this.rootObservableCallback?.(),
  //     );
  //     const result = Reflect.set(target.$value, property, newItem);
  //     // @ts-ignore
  //     newItem.notifyCurrentValue?.();
  //     return result;
  //   }
  //   return false;
  // }

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

  ownKeys(target) {
    return Reflect.ownKeys(target.$value as object);
  }

  getOwnPropertyDescriptor(target, prop) {
    return {
      ...Reflect.getOwnPropertyDescriptor(target, prop),
      enumerable: true,
      configurable: true,
    };
  }

  has(target, property) {
    return this.ownKeys(target).includes(property);
  }
}
