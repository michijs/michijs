import { observable } from './observable';
import { observe } from './observe';

export function observableValue<T = unknown>(initialValue: T) {
  const { notify, ...observableProps } = observable<T>();
  const state = observe({
    item: { value: initialValue, ...observableProps },
    onChange: () => {
      notify(state.value);
    },
    shouldValidatePropertyChange: () => true
  });
  return state;
}

