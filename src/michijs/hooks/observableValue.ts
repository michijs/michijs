import { observable } from './observable';
import { ObservableObject, observe } from './observe';

export function observableValue<T = unknown>(initialValue: T) {
  const { notify, ...observableProps } = observable<ObservableObject<T, unknown>>();
  const state = observe({
    item: { value: initialValue, ...observableProps },
    onChange: () => {
      notify(state.value);
    },
    shouldValidatePropertyChange: () => true,
    propertyPath: ''
  });
  return state;
}

