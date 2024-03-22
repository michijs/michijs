import { deepEqual } from "../../utils/deepEqual";
import { observe, type ObserveProps } from "../observe";
import {
  customMapAndSetClear,
  customMapAndSetDelete,
} from "./mapAndSetCommonHandlers";
import { customObjectDelete, customObjectSet } from "./observeCommonObject";

export const observeMap = <T extends Map<unknown, unknown>>(
  props: ObserveProps<T>,
): T => {
  const proxiedMap = new Map() as T;
  props.item.forEach((value, key) =>
    proxiedMap.set(
      key,
      observe({
        ...props,
        item: value,
        propertyPath: `${props.propertyPath}.${key}`,
      }),
    ),
  );
  return new Proxy<T>(proxiedMap, {
    set: (target, property, newValue, receiver) =>
      customObjectSet(props)(target, property, newValue, receiver),
    get: (target, property) => {
      const targetProperty = Reflect.get(target, property);
      const bindedTargetProperty =
        typeof targetProperty === "function"
          ? (targetProperty as Function).bind(target)
          : targetProperty;
      switch (property) {
        case "clear": {
          return customMapAndSetClear(props, target, bindedTargetProperty);
        }
        case "set": {
          return (key, newValue) => {
            const newPropertyPath = `${props.propertyPath}.${key}`;
            const notifyChange =
              props.shouldValidatePropertyChange(newPropertyPath) &&
              !deepEqual(newValue, target.get(key));
            const result = bindedTargetProperty(
              key,
              observe({
                ...props,
                item: newValue,
                propertyPath: newPropertyPath,
              }),
            );
            if (notifyChange) props.onChange(newPropertyPath);
            return result;
          };
        }
        case "delete": {
          return customMapAndSetDelete(props, target, bindedTargetProperty);
        }
        // case 'subscribe': {
        //   return (callback) => props.subscribeCallback?.(props.propertyPath, callback);
        // }
        default: {
          return bindedTargetProperty;
        }
      }
    },
    deleteProperty: customObjectDelete(props),
  });
};
