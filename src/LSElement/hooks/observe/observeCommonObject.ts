import { deepEqual } from '../../utils/deepEqual';
import { observe, ObserveHandlerProps, ObserveProps } from '../observe';

export const customObjectSet = (props: ObserveHandlerProps, customValidation = true): ProxyHandler<object>['set'] => {
  return (target, property, newValue, receiver) => {
    const { propertyPath, shouldValidatePropertyChange, onChange } = props;
    const oldValue = target[property];
    const newPropertyPath = `${propertyPath}.${property.toString()}`;
    const notifyChange = shouldValidatePropertyChange(newPropertyPath) && customValidation && !deepEqual(newValue, oldValue);
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

export const observeCommonObject = ({ item, ...props }: ObserveProps<object>) => {
  const itemCopy = { ...item };
  Object.entries(itemCopy).forEach(([key, value]) => {
    itemCopy[key] = observe({ ...props, item: value as object, propertyPath: `${props.propertyPath}.${key}` });
  });
  return new Proxy(itemCopy, {
    set: customObjectSet(props),
    deleteProperty: customObjectDelete(props),
  });
};