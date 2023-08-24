import { useObserve } from "../useObserve";
import { ObservableType, ObserverCallback } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import { customObjectDelete, customObjectSet } from "./observeCommonObject";

export function observeArray<T extends Array<unknown>>(
  item: T,
  initialObservers: ObserverCallback<T>[] = []
) {
  const proxiedArray = item.map((value) => useObserve(value, initialObservers));

  const newObservable = new ProxiedValue(proxiedArray);
  return new Proxy(newObservable, {
    set: customObjectSet(initialObservers),
    deleteProperty: customObjectDelete,
    get(target, property, receiver) {
      if (property in target) return Reflect.get(target, property);
      else {
      }
    },
    // Any change calls the set trap
    // get(target, property) {
    //     const targetProperty = Reflect.get(target, property);
    // switch (property) {
    //     case 'unshift':
    //     case 'shift':
    //     case 'pop':
    //     case 'push': {
    //         return function (...args) {
    //             const result = targetProperty.apply(target, args)
    //             if (result !== undefined)
    //                 onChange(rootPropertyName);//TODO: Notify with all values?
    //             return result;
    //         }
    //     }
    //     case 'splice': {
    //         return function (...args) {
    //             const result = targetProperty.apply(target, args)
    //             if (result.length !== 0)
    //                 onChange(rootPropertyName);//TODO: Notify with all values?
    //             return result;
    //         }
    //     }
    //     case 'reverse':
    //     case 'sort':
    //     case 'fill': {
    //         return function (...args) {
    //             const result = targetProperty.apply(target, args)
    //             // TODO: how do I know if changed?
    //             onChange(rootPropertyName);//TODO: Notify with all values?
    //             return result;
    //         };
    //     }
    //     default: {
    // return typeof targetProperty === 'function' ? targetProperty.bind(target) : targetProperty;
    // }
    // }
    // },
  }) as unknown as ObservableType<T>;
}
