import { ObserveProps } from '../observe';

export const observeDate = ({ item, propertyPath, onChange }: ObserveProps<Date>) => {
  return new Proxy<Date>(new Date(item), {
    get(target, property) {
      const targetProperty = Reflect.get(target, property);
      if (typeof property === 'string' && property.startsWith('set')) {
        return function (...args) {
          const oldValue = target.getTime();
          const result = targetProperty.apply(target, args);
          const newValue = target.getTime();
          if (newValue !== oldValue)
            onChange(`${propertyPath}.${property}`);

          return result;
        };
      }
      return typeof targetProperty === 'function' ? targetProperty.bind(target) : targetProperty;
    },
  });
};