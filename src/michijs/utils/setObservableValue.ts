import { useObserve } from "../..";
import { ObservableType, ObserverCallback } from "../types";

export function setObservableValue<T extends ObservableType<any>>(
  object1: T,
  object2: any,
  initialObservers?: ObserverCallback<T>[]
): boolean {
  const object1Value = object1?.valueOf();
  const object2Value = object2?.valueOf();
  
  if (object1Value === object2Value || object1Value == object2Value)
    return true;

  const type = typeof object1Value;
  const areDifferentTypes = type !== typeof object2Value;
  if (areDifferentTypes) {
    return Reflect.set(object1, "$value", useObserve(object2, initialObservers).$value);
  }
  switch (type) {
    case "function": {
      return Reflect.set(object1, "$value", object2Value);
    }
    case "object": {
      if (object1Value || object2Value) {
        if (Array.isArray(object1Value)) {
          (object1 as unknown as []).length = object2Value.length;
          object2Value.forEach((x, i) => (object1[i] = x));
        } else {
          for (const key in { ...object1Value, ...object2Value }) {
            object1[key] = object2Value[key];
          }
        }
        return true;
        // TODO: add set / map etc
      } else {
        return Reflect.set(object1, "$value", useObserve(object2, initialObservers).$value);
      }
    }
    default: {
      return Reflect.set(object1, "$value", object2);
    }
  }
}
// export function deepEqual(object1Value, object2Value) {
//   const result = deepEqual2(object1Value, object2Value)
//   console.log(object1Value, object2Value, result)
//   return result;
// }
