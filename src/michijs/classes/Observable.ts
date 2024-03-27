import type { ObservableLike, Subscription } from "../types";

export class Observable<T> extends Function implements ObservableLike<T> {
  // Intentional explicit null value - it breaks proxy otherwise
  observers: Set<Subscription<T>> | null = null;

  constructor(initialObservers?: Subscription<T>[]) {
    super();
    if (initialObservers) this.observers = new Set(initialObservers);
  }

  notify(value) {
    this.observers?.forEach((observer) => {
      observer(value);
    });
  }

  subscribe(observer: Subscription<T>) {
    if (this.observers) this.observers.add(observer);
    else this.observers = new Set([observer]);
  }

  unsubscribe(oldObserver: Subscription<T>) {
    this.observers?.delete(oldObserver);
  }
}
