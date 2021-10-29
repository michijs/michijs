import { deepEqual } from '../../utils/deepEqual';
import { observe, ObserveHandlerProps, ObserveProps } from '../observe';

export const customObjectSet = (props: ObserveHandlerProps, customValidation = true): ProxyHandler<object>['set'] => {
  return (target, property, newValue, receiver) => {
    const { rootPropertyName, shouldValidatePropertyChange, onChange } = props;
    const oldValue = target[property];
    const propertyName = rootPropertyName ?? property;
    const notifyChange = shouldValidatePropertyChange(propertyName) && customValidation && !deepEqual(newValue, oldValue);
    const proxyValue = observe({ ...props, item: newValue, rootPropertyName: propertyName });
    const result = Reflect.set(target, property, proxyValue, receiver);
    if (notifyChange)
      onChange(propertyName);
    return result;
  };
};

export const customObjectDelete = ({ shouldValidatePropertyChange, rootPropertyName, onChange }: ObserveHandlerProps): ProxyHandler<object>['deleteProperty'] => {
  return (target, property) => {
    const hasAnOldValue = shouldValidatePropertyChange(property) && target[property] !== undefined;
    const result = Reflect.deleteProperty(target, property);
    if (hasAnOldValue)
      onChange(rootPropertyName ?? property);
    return result;
  };
};

export const observeCommonObject = ({ item, ...props }: ObserveProps<object>) => {
  const itemCopy = { ...item };
  Object.entries(itemCopy).forEach(([key, value]) => {
    itemCopy[key] = observe({ ...props, item: value as object, rootPropertyName: props.rootPropertyName ?? key });
  });
  return new Proxy(itemCopy, {
    set: customObjectSet(props),
    deleteProperty: customObjectDelete(props),
  });
};