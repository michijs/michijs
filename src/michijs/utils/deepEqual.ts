export function deepEqual(object1: any, object2: any): boolean {
  const object1Value = object1?.valueOf();
  const object2Value = object2?.valueOf();
  if (object1Value === object2Value || object1Value == object2Value) return true;

  const type = typeof object1Value;
  const areDifferentTypes = type !== typeof object2Value;
  if (areDifferentTypes) return false;

  switch (type) {
    case "function": {
      return (
        object1Value.name === object2Value.name &&
        object1Value.toString() === object2Value.toString()
      );
    }
    case "object": {
      // TODO: add set / map etc
      if (Array.isArray(object1Value)) {
        if (object1Value.length !== object2Value.length) return false;
        return !object1Value.find(
          (value, index) => !deepEqual(value, object2Value[index]),
        );
      }
      // null can't have keys, so I use the non-null value
      for (const key in object1Value !== null && object1Value !== void 0
        ? object1Value
        : object2Value) {
        if (
          !deepEqual(
            object1Value === null || object1Value === void 0 ? void 0 : object1Value[key],
            object2Value === null || object2Value === void 0 ? void 0 : object2Value[key],
          )
        )
          return false;
      }
      return true;
    }
  }
  return false;
}
// export function deepEqual(object1Value, object2Value) {
//   const result = deepEqual2(object1Value, object2Value)
//   console.log(object1Value, object2Value, result)
//   return result;
// }
