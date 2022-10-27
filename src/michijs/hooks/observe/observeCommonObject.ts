import { deepEqual } from '../../utils/deepEqual';
import { observe, ObserveHandlerProps, ObserveProps } from '../observe';

export const customObjectSet = (props: ObserveHandlerProps): ProxyHandler<object>['set'] => {
  return (target, property, newValue, receiver) => {
    const { propertyPath, shouldValidatePropertyChange, onChange } = props;
    const oldValue = target[property];
    const newPropertyPath = `${propertyPath}.${property.toString()}`;
    const notifyChange = shouldValidatePropertyChange(newPropertyPath) && !deepEqual(newValue, oldValue);
    const proxyValue = observe({ ...props, item: newValue, propertyPath: newPropertyPath });
    const result = Reflect.set(target, property, proxyValue, receiver);
    if (notifyChange)
      onChange(newPropertyPath);
    return result;
  };
};

export const customObjectDelete = ({ shouldValidatePropertyChange, propertyPath, onChange }: ObserveHandlerProps): ProxyHandler<object>['deleteProperty'] => {
  return (target, property) => {
    const newPropertyPath = `${propertyPath}.${property.toString()}`;
    const hasAnOldValue = shouldValidatePropertyChange(newPropertyPath) && target[property] !== undefined;
    const result = Reflect.deleteProperty(target, property);
    if (hasAnOldValue)
      onChange(newPropertyPath);
    return result;
  };
};

export const observeCommonObject = <Y>({ item, ...props }: ObserveProps<object,Y>) => {
  const itemCopy = {};
  Object.entries(item).forEach(([key, value]) => {
    itemCopy[key] = observe({ ...props, item: value as object, propertyPath: `${props.propertyPath}.${key}` });
  });
  return new Proxy(itemCopy, {
    set: customObjectSet(props),
    deleteProperty: customObjectDelete(props),
    get(target, p, receiver) {
      if (p === 'subscribe')
        return (callback) => props.subscribeCallback?.(props.propertyPath, callback);
      return Reflect.get(target, p, receiver);
    }
  });
};