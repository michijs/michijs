import { observe, ObserveProps } from "../observe";
import {
  customMapAndSetClear,
  customMapAndSetDelete,
} from "./mapAndSetCommonHandlers";
import { customObjectDelete, customObjectSet } from "./observeCommonObject";

export const observeSet = <T extends Set<unknown>>(props: ObserveProps<T>) => {
  const proxiedSet = new Set();
  props.item.forEach((value, key) => {
    const newPropertyPath = `${props.propertyPath}.${key}`;
    proxiedSet.add(
      observe({ ...props, item: value, propertyPath: newPropertyPath }),
    );
  });
  return new Proxy<Set<any>>(proxiedSet, {
    set: (target, property: keyof Set<any>, newValue, receiver) =>
      customObjectSet(props)(target, property, newValue, receiver),
    get: (target, property: keyof Set<any> & "subscribe") => {
      const targetProperty = Reflect.get(target, property);
      const bindedTargetProperty =
        typeof targetProperty === "function"
          ? (targetProperty as Function).bind(target)
          : targetProperty;
      switch (property) {
        case "clear": {
          return customMapAndSetClear(props, target, bindedTargetProperty);
        }
        case "add": {
          return (newValue) => {
            const newPropertyPath = `${props.propertyPath}.${newValue}`;
            const notifyChange =
              props.shouldValidatePropertyChange(newPropertyPath) &&
              !target.has(newValue);
            const result = bindedTargetProperty(
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
