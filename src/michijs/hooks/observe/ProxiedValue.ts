import { ObservableLike, ObserverCallback } from "../../types";
import { deepEqual } from "../../utils";

export class ProxiedValue<T extends object | undefined> implements ObservableLike<T> {
  #value: T;
  $observers = new Set<ObserverCallback<T>>();

  constructor(initialValue: T) {
    this.#value = initialValue;
  }

  set $value(newValue: T) {
    if (!deepEqual(newValue, this.#value)) {
      this.#value = newValue;
      this.$observers.forEach(x => x(newValue))
    }
  }
  get $value() {
    return this.valueOf();
  }

  valueOf() {
    return this.$value;
  }

  toString() {
    return this.$value?.toString && this.$value?.toString();
  }

  notify = (value: T) => {
    this.$observers.forEach((observer) => {
      observer(value);
    });
  };

  subscribe: ObservableLike<T>["subscribe"] = (observer): void => {
    this.$observers.add(observer);
  };

  unsubscribe = (oldObserver: ObserverCallback<T>): void => {
    this.$observers.delete(oldObserver);
  };
}
