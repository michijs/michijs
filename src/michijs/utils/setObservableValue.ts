import { ProxiedValue, ProxiedArray } from "../classes/ProxiedValue";
import { useObserveInternal } from "../hooks/useObserve";
import type { ObservableType, ParentSubscription } from "../types";
import { isPrototypeOfObject } from "./isPrototypeOfObject";

// <T extends ObservableType<any>>
export function setObservableValue<T extends object>(
  object1: T,
  object2: any,
  // Intentional - this function should be only used on observe functions to avoid removing subscription to parents
  parentSubscription?: ParentSubscription<any>,
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
        parentSubscription,
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
            parentSubscription,
            rootObservableCallback,
          ).$value,
        );

      ProxiedValue.startTransaction();
      if (object1 instanceof ProxiedArray && Array.isArray(object2Value)) {
        object1.$replace([...object2Value]);
      } else if (isPrototypeOfObject(object1Value))
        for (const key in { ...object1Value, ...object2Value }) {
          // This only works because object1 is a proxy - It is done this way to avoid re-using logic - the proxy is in charge of knowing how to set new values
          // tried using object1[key](object2Value[key]); but it breaks functions for some reason
          object1[key] = object2Value[key];
        }
      // set / map etc
      else
        Reflect.set(
          object1,
          "$value",
          useObserveInternal<Object>(
            object2,
            parentSubscription,
            rootObservableCallback,
          ).$value,
        );
      ProxiedValue.endTransaction();
      return true;
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
