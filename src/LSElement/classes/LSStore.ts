import type { ChangeFunction, Store } from '../types';
import { deepEqual } from '../utils/deepEqual';

export class LSStore implements Store<Map<string, any>> {
    private state;
    private listeners: Array<ChangeFunction> = [];
    private listenersOnFinishChanges: Array<() => any> = [];
    private pendingChanges = 0;
    constructor(initialState: Map<string, any>) {
      this.state = initialState;
    }

    private onChange(propertyKey: string, newValue: any, oldValue: any) {
      this.pendingChanges++;
      this.listeners.forEach(listener => {
        listener(propertyKey, newValue, oldValue);
      });
      this.pendingChanges--;
      if (this.pendingChanges === 0) {
        this.listenersOnFinishChanges.forEach(listener => {
          listener();
        });
      }
    }

    getState() {
      return this.state;
    }

    setState(propertyKey: string, newValue: any) {
      const oldValue = this.state.get(propertyKey);
      this.state.set(propertyKey, newValue);
      if (!deepEqual(newValue, oldValue)) {
        this.onChange(propertyKey, newValue, oldValue);
      }
    }

    subscribe(listener: ChangeFunction) {
      this.listeners.push(listener);
    }

    onFinishChanges(listener: () => void) {
      this.listenersOnFinishChanges.push(listener);
    }
}