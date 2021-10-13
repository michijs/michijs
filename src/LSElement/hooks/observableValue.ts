import { observable } from './observable';
import { observe } from './observe';

export function observableValue<T = unknown>(initialValue: T) {
  const { notify, ...observableProps } = observable<T>();
  const state = observe({value: initialValue, ...observableProps}, () => {
    notify(state.value);
  });
  return state;
}

