import { ObservableLike, ObserverCallback } from "../../types";
import { deepEqual } from "../../utils";

export class ProxiedValue<T> implements ObservableLike<T> {
  private value: T;
  observers: Set<ObserverCallback<T>> | undefined;

  constructor(initialValue?: T, initialObservers?: Set<ObserverCallback<T>>) {
    this.value = initialValue as T;
    this.observers = initialObservers;
  }

  set $value(newValue: T) {
    console.log(newValue, this.value)
    if (this.shouldCheckForChanges()) {
      if (!deepEqual(newValue, this.value)) {
        this.value = newValue;
        this.notify(newValue)
      }
    } else
      this.value = newValue;
  }
  get $value() {
    return this.value;
  }

  // Avoids typescript errors
  protected valueOf() {
    return this.value;
  }

  toString() {
    return this.$value?.toString && this.$value?.toString();
  }

  notify(value = this.value) {
    this.observers?.forEach((observer) => {
      observer(value);
    });
  };

  subscribe(observer: ObserverCallback<T>) {
    if (this.observers)
      this.observers.add(observer);
    else
      this.observers = new Set([observer]);
  };

  unsubscribe(oldObserver: ObserverCallback<T>) {
    this.observers?.delete(oldObserver);
  };

  shouldCheckForChanges() {
    return !!this.observers
  }
}
