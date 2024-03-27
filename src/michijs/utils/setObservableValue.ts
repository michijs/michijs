import { ProxiedArray, type ProxiedValue, useObserve } from "../..";
import type { Subscription } from "../types";

// <T extends ObservableType<any>>
export function setObservableValue<T extends object>(
  object1: T,
  object2: any,
  initialObservers?: Subscription<T>[],
): boolean {
  const object1Value = object1?.valueOf();
  const object2Value = object2?.valueOf();

  if (object1Value === object2Value || object1Value == object2Value)
    return true;

  const type = typeof object1Value;
  const typeObject2 = typeof object2Value;
  const areDifferentTypes = type !== typeObject2;
  if (areDifferentTypes) {
    return Reflect.set(
      object1,
      "$value",
      useObserve<Object>(object2, initialObservers as Subscription<Object>[])
        .$value,
    );
  }
  switch (type) {
    case "function": {
      return Reflect.set(object1, "$value", object2Value);
    }
    case "object": {
      if (object1Value || object2Value) {
        const castedObject1 = object1 as ProxiedValue<unknown>;
        castedObject1.startTransaction();
        if (object1 instanceof ProxiedArray && Array.isArray(object2Value)) {
          object1.$replace(
            ...object2Value.map((x) =>
              useObserve<Object>(x, initialObservers as Subscription<Object>[]),
            ),
          );
        } else if (Object.getPrototypeOf(object1Value) === Object.prototype)
          for (const key in { ...object1Value, ...object2Value }) {
            object1[key] = object2Value[key];
          }
        else
          Reflect.set(
            object1,
            "$value",
            useObserve<Object>(
              object2,
              initialObservers as Subscription<Object>[],
            ).$value,
          );
        castedObject1.endTransaction();
        return true;
        // TODO: add set / map etc
      } else {
        return Reflect.set(
          object1,
          "$value",
          useObserve<Object>(
            object2,
            initialObservers as Subscription<Object>[],
          ).$value,
        );
      }
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
