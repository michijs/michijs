import { ChangeFunction, Store } from '../types';
import { deepEqual } from '../utils/deepEqual';

export function useStore<T extends object>(initialState: T): Store<T> {
  const listeners: Array<ChangeFunction> = [];
  const listenersOnFinishChanges: Array<() => any> = [];
  let pendingChanges = 0;

  function onChange(propertyKey: string, newValue: any, oldValue: any) {
    pendingChanges++;
    listeners.forEach(listener => {
      listener(propertyKey, newValue, oldValue);
    });
    pendingChanges--;
    if (pendingChanges === 0) {
      listenersOnFinishChanges.forEach(listener => {
        listener();
      });
    }
  }

  const state = initialState;

  function getState() {
    return state;
  }

  function setState(newState: Partial<T>) {
    Object.keys(newState).forEach(propertyKey => {
      const oldValue = getState()[propertyKey];
      state[propertyKey] = newState[propertyKey];
      const newValue = newState[propertyKey];
      if (!deepEqual(newValue, oldValue)) {
        onChange(propertyKey, newValue, oldValue);
      }
    });
  }

  function subscribe(listener: ChangeFunction) {
    listeners.push(listener);
  }

  function onFinishChanges(listener: () => any) {
    listenersOnFinishChanges.push(listener);
  }

  return { getState, setState, subscribe, onFinishChanges };
}
