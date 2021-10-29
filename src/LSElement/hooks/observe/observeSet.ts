import { observe, ObserveProps } from '../observe';
import { customMapAndSetClear, customMapAndSetDelete } from './mapAndSetCommonHandlers';
import { customObjectDelete, customObjectSet } from './observeCommonObject';

export const observeSet = (props: ObserveProps<any>) => {
  const proxiedSet = new Set();
  props.item.forEach((value, key) => {
    proxiedSet.add(observe({...props, item: value, rootPropertyName: props.rootPropertyName ?? key}));
  });
  return new Proxy<Set<any>>(proxiedSet, {
    set: (target, property: keyof Map<any, any>, newValue, receiver) => customObjectSet(props, property !== 'size')(target, property, newValue, receiver),
    get: (target, property: keyof Set<any>) => {
      const targetProperty = Reflect.get(target, property);
      const bindedTargetProperty = typeof targetProperty === 'function' ? targetProperty.bind(target) : targetProperty;
      switch (property) {
        case 'clear': {
          return customMapAndSetClear(props, target, bindedTargetProperty);
        }
        case 'add': {
          return function (newValue) {
            const propertyName = props.rootPropertyName ?? newValue;
            const notifyChange = props.shouldValidatePropertyChange(propertyName) && !target.has(newValue);
            const result = bindedTargetProperty(observe({...props, item: newValue, rootPropertyName: propertyName}));
            if (notifyChange)
              props.onChange(propertyName);
            return result;
          };
        }
        case 'delete': {
          return customMapAndSetDelete(props, target, bindedTargetProperty);
        }
        default: {
          return bindedTargetProperty;
        }
      }
    },
    deleteProperty: customObjectDelete(props)
  });
};