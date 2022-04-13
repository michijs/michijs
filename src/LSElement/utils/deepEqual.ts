export function deepEqual(object1, object2) {
  const type = typeof object1;
  const areDifferentTypes = type !== typeof object2;
  if (areDifferentTypes) {
    return false;
  }
  switch (type) {
    case 'function': {
      return object1.name === object2.name && object1.toString() === object2.toString();
    }
    case 'object': {
      // TODO: add set / map etc
      if (Array.isArray(object1)) {
        if (object1.length !== object2.length)
          return false;

        return !object1.find((value, index) => !deepEqual(value, object2[index]));
      }
      for (const key in object1) {
        if (!deepEqual(object1[key], object2[key]))
          return false;
      }
      return true;
    }
    default: return object1 === object2;
  }
}

// export function deepEqual(object1, object2) {
//   const result = deepEqual2(object1, object2)
//   console.log(object1, object2, result)
//   return result;
// }