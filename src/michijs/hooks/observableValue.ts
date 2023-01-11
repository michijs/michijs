import { observable } from './observable';
import { observe } from './observe';

export function observableValue<T = unknown>(initialValue: T) {
  const { notify, ...observableProps } = observable<string>();
  const state = observe<{ value: T }, string>({
    item: { value: initialValue, ...observableProps },
    onChange: (propertyPath) => {
      if (propertyPath)
        notify(propertyPath);
    },
    shouldValidatePropertyChange: () => true,
    propertyPath: ''
  });
  return state;
}

