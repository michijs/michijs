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
      const areObjects = isObject(object1) && isObject(object2);
      if (areObjects) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
          return false;
        }

        for (const key of keys1) {
          const val1 = object1[key];
          const val2 = object2[key];

          const areObjects = isObject(val1) && isObject(val2);
          if (areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2) {
            return false;
          }
        }
        return true;
      } return false;
    }
    default: return object1 === object2;
  }
}
function isObject(object) {
  return object != null && typeof object === 'object';
}
