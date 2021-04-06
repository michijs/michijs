import { ChangeFunction, Store } from '../types';
import { deepEqual } from '../utils/deepEqual';

export function useStore(initialState: Map<string, any>): Store<Map<string, any>> {
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

  function setState(propertyKey: string, newValue: any) {
    const oldValue = state.get(propertyKey);
    state.set(propertyKey, newValue);
    if (!deepEqual(newValue, oldValue)) {
      onChange(propertyKey, newValue, oldValue);
    }
  }

  function subscribe(listener: ChangeFunction) {
    listeners.push(listener);
  }

  function onFinishChanges(listener: () => void) {
    listenersOnFinishChanges.push(listener);
  }

  return { getState, setState, subscribe, onFinishChanges };
}
