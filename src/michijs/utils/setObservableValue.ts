import { observe } from "../..";
import { Observable } from "../types";

export function setObservableValue<T extends Observable<unknown>>(
  object1: T,
  object2: any,
): boolean {
  const object1Value = object1?.valueOf();
  const object2Value = object2?.valueOf();
  if (object1Value === object2Value || object1Value == object2Value)
    return true;

  const type = typeof object1Value;
  const areDifferentTypes = type !== typeof object2Value;
  if (areDifferentTypes) {
    Reflect.set(object1, "$value", observe(object2).$value);
    return true;
  }
  switch (type) {
    case "function": {
      Reflect.set(object1, "$value", object2Value);
    }
    case "object": {
      if (object1Value || object2Value) {
        if (Array.isArray(object1Value)) {
          const nonNullObject1 = object1Value ?? observe([]);
          nonNullObject1.length = object2Value.length;
          object2Value.forEach((x, i) => (nonNullObject1[i] = x));
        } else {
          const nonNullObject1 = object1Value ?? observe({});
          for (const key in Object.keys({ ...object1Value, ...object2Value })) {
            nonNullObject1[key] = object2Value[key];
          }
        }
        // TODO: add set / map etc
      } else {
        Reflect.set(object1, "$value", observe(object2).$value);
      }
    }
    default: {
      Reflect.set(object1, "$value", observe(object2).$value);
    }
  }
  return true;
}
// export function deepEqual(object1Value, object2Value) {
//   const result = deepEqual2(object1Value, object2Value)
//   console.log(object1Value, object2Value, result)
//   return result;
// }
