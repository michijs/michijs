export function deepEqual(object1: any, object2: any): boolean {
  const object1Value = object1?.valueOf();
  const object2Value = object2?.valueOf();
  if (object1Value === object2Value)
    return true;

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
      // One is null
      if (object1Value === null || object2Value === null)
        return false

      // TODO: add set / map etc
      if (Array.isArray(object1Value)) {
        if (object1Value.length !== object2Value.length) return false;
        return !object1Value.find(
          (value, index) => !deepEqual(value, object2Value[index]),
        );
      } else {
        if (Object.keys(object1Value).length !== Object.keys(object2Value).length)
          return false
        for (const key in { ...object1Value, ...object2Value }) {
          if (
            !deepEqual(object1Value[key], object2Value[key])
          )
            return false;
        }
      }
      return true;
    }
  }
  return false;
}