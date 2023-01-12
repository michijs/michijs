import { deepEqual } from '../../utils/deepEqual';
import { ObservableObject, observe, ObserveProps } from '../observe';
import { customMapAndSetClear, customMapAndSetDelete } from './mapAndSetCommonHandlers';
import { customObjectDelete, customObjectSet } from './observeCommonObject';

export const observeMap = <Y, A = unknown, B = unknown>(props: ObserveProps<Map<A, B>, Y>): ObservableObject<Map<A, B>, Y> => {
  const proxiedMap = new Map();
  props.item.forEach((value, key) => proxiedMap.set(key, observe({ ...props, item: value, propertyPath: `${props.propertyPath}.${key}` })));
  return new Proxy<Map<A, B>>(proxiedMap, {
    set: (target, property: keyof Map<A, B>, newValue, receiver) => customObjectSet(props)(target, property, newValue, receiver),
    get: (target, property: keyof Map<A, B> & 'subscribe') => {
      const targetProperty = Reflect.get(target, property);
      const bindedTargetProperty = typeof targetProperty === 'function' ? (targetProperty as Function).bind(target) : targetProperty;
      switch (property) {
        case 'clear': {
          return customMapAndSetClear(props, target, bindedTargetProperty);
        }
        case 'set': {
          return function (key, newValue) {
            const newPropertyPath = `${props.propertyPath}.${key}`;
            const notifyChange = props.shouldValidatePropertyChange(newPropertyPath) && !deepEqual(newValue, (target as Map<A, B>).get(key));
            const result = bindedTargetProperty(key, observe({ ...props, item: newValue, propertyPath: newPropertyPath }));
            if (notifyChange)
              props.onChange(newPropertyPath);
            return result;
          };
        }
        case 'delete': {
          return customMapAndSetDelete(props, target, bindedTargetProperty);
        }
        case 'subscribe': {
          return (callback) => props.subscribeCallback?.(props.propertyPath, callback);
        }
        default: {
          return bindedTargetProperty;
        }
      }
    },
    deleteProperty: customObjectDelete(props)
  });
};