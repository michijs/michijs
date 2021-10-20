import { deepEqual } from '../../utils/deepEqual';
import { observe, ObserveProps } from '../observe';
import { customMapAndSetClear, customMapAndSetDelete } from './mapAndSetCommonHandlers';
import { customObjectDelete, customObjectSet } from './observeCommonObject';

export const observeMap = (props: ObserveProps<Map<any, any>>) => {
  const proxiedMap = new Map();
  props.item.forEach((value, key) => {
    proxiedMap[key] = observe({ ...props, item: value, rootPropertyName: props.rootPropertyName ?? key });
  });
  return new Proxy<Map<any, any>>(proxiedMap, {
    set: (target, property: keyof Map<any, any>, newValue, receiver) => customObjectSet(props, property !== 'size')(target, property, newValue, receiver),
    get: (target, property: keyof Map<any, any>) => {
      const targetProperty = Reflect.get(target, property);
      const bindedTargetProperty = typeof targetProperty === 'function' ? targetProperty.bind(target) : targetProperty;
      switch (property) {
        case 'clear': {
          return customMapAndSetClear(props, target, bindedTargetProperty);
        }
        case 'set': {
          return function (key, newValue) {
            const propertyName = props.rootPropertyName ?? key;
            const notifyChange = props.shouldValidatePropertyChange(propertyName) && !deepEqual(newValue, (target as Map<any, any>).get(key));
            const result = bindedTargetProperty(key, observe({ ...props, item: newValue, rootPropertyName: propertyName }));
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