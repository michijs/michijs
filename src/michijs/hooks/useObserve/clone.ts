import { deepEqual } from "../../utils/deepEqual";

export const clone = <T>(item: T) => {
  try {
    return structuredClone(item);
  } catch {
    if (typeof item === "object") {
      if (item instanceof Node) return item.cloneNode();

      // @ts-ignore
      const itemCopy = new item.constructor();
      for (const k in item) {
        if (Object.prototype.hasOwnProperty.call(item, k)) {
          if (typeof item[k] === "function") {
            if (!deepEqual(itemCopy[k], item[k])) itemCopy[k] = clone(item[k]);
          } else if (itemCopy[k] !== item[k]) itemCopy[k] = clone(item[k]);
        }
      }
      return itemCopy;
    }
    return item;
  }
};
