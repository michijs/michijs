import { ObservableLike, ObserverCallback } from "../types";

export class Observable<T> implements ObservableLike<T> {
  observers: Set<ObserverCallback<T>> | undefined;

  constructor(initialObservers?: Set<ObserverCallback<T>>) {
    this.observers = initialObservers;
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
