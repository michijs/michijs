export function deepEqual(object1, object2) {
  const type = typeof object1;
  const areDifferentTypes = type !== typeof object2;
  if (areDifferentTypes) {
    return false;
  }
  switch (true) {
    case type === 'undefined': return true;
    case type === 'function': {
      return object1.toString() === object2.toString();
    }
    case type === 'object': {
      if (object1 !== null && object2 !== null) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
          return false;
        }

        for (const key of keys1) {
          if (!deepEqual(object1[key], object2[key])) {
            return false;
          }
        }
        return true;
      } return object1 === object2;//One of them is null or both
    }
    default: return object1 === object2;
  }
}
