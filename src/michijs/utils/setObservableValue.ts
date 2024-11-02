import { ProxiedValue, ProxiedArray } from "../classes/ProxiedValue";
import { useObserveInternal } from "../hooks/useObserve";
import type { ObservableType, Subscription } from "../types";

// <T extends ObservableType<any>>
export function setObservableValue<T extends object>(
  object1: T,
  object2: any,
  // Intentional - this function should be only used on observe functions to avoid removing subscription to parents
  initialObservers?: Subscription<T>[],
  rootObservableCallback?: () => ObservableType<any>,
): boolean {
  // null?.valueOf() is undefined - bug
  const object1Value = object1 ? object1.valueOf() : object1;
  const object2Value = object2 ? object2.valueOf() : object2;

  if (object1Value === object2Value || object1Value == object2Value)
    return true;

  const type = typeof object1Value;
  const typeObject2 = typeof object2Value;
  const areDifferentTypes = type !== typeObject2;
  if (areDifferentTypes) {
    return Reflect.set(
      object1,
      "$value",
      useObserveInternal<Object>(
        object2,
        initialObservers as Subscription<Object>[],
        rootObservableCallback,
      ).$value,
    );
  }
  switch (type) {
    case "function": {
      return Reflect.set(object1, "$value", object2Value);
    }
    case "object": {
      if (object1Value === null || object2Value === null)
        return Reflect.set(
          object1,
          "$value",
          useObserveInternal<Object>(
            object2,
            initialObservers as Subscription<Object>[],
            rootObservableCallback,
          ).$value,
        );

      ProxiedValue.startTransaction();
      if (object1 instanceof ProxiedArray && Array.isArray(object2Value)) {
        object1.$replace(...object2Value);
      } else if (Object.getPrototypeOf(object1Value) === Object.prototype)
        for (const key in { ...object1Value, ...object2Value }) {
          object1[key](object2Value[key]);
        }
      else
        Reflect.set(
          object1,
          "$value",
          useObserveInternal<Object>(
            object2,
            initialObservers as Subscription<Object>[],
            rootObservableCallback,
          ).$value,
        );
      ProxiedValue.endTransaction();
      return true;
      // TODO: add set / map etc
    }
    default: {
      return Reflect.set(object1, "$value", object2Value);
    }
  }
}
// export function deepEqual(object1Value, object2Value) {
//   const result = deepEqual2(object1Value, object2Value)
//   console.log(object1Value, object2Value, result)
//   return result;
// }
