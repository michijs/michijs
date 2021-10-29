import { ObserveHandlerProps } from '../observe';

export const customMapAndSetClear = ({ onChange, rootPropertyName }: Pick<ObserveHandlerProps, 'onChange' | 'rootPropertyName'>, target: Map<any, any> | Set<any>, clearFn: Map<any, any>['clear'] | Set<any>['clear']): Map<any, any>['clear'] | Set<any>['clear'] => {
  return function () {
    const notifyChange = target.size !== 0;
    const result = clearFn();
    if (notifyChange)
      onChange(rootPropertyName);//TODO: Should send each index?
    return result;
  };
};

export const customMapAndSetDelete = ({ rootPropertyName, onChange, shouldValidatePropertyChange }: ObserveHandlerProps, target: Map<any, any> | Set<any>, deleteFn: Map<any, any>['delete'] | Set<any>['delete']): Map<any, any>['delete'] | Set<any>['delete'] => {
  //In Map is key, in Set is value
  return function (key) {
    const propertyName = rootPropertyName ?? key;
    const notifyChange = shouldValidatePropertyChange(propertyName) && target.has(key);
    const result = deleteFn(key);
    if (notifyChange)
      onChange();
    return result;
  };
};