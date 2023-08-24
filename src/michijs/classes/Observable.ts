import { ObservableLike, ObserverCallback } from "../types";

export class Observable<T> implements ObservableLike<T> {
  // Intentional explicit null value - it breaks proxy otherwise
  observers: Set<ObserverCallback<T>> | null = null;

  constructor(initialObservers?: ObserverCallback<T>[]) {
    if (initialObservers)
      this.observers = new Set(initialObservers);
  }

  notify(value) {
    this.observers?.forEach((observer) => {
      observer(value);
    });
  }

  subscribe(observer: ObserverCallback<T>) {
    if (this.observers) this.observers.add(observer);
    else this.observers = new Set([observer]);
  }

  unsubscribe(oldObserver: ObserverCallback<T>) {
    this.observers?.delete(oldObserver);
  }
}
