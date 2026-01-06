import type { Subscription } from "../shared/types/core";

export class Observable<T> {
  observers: Set<Subscription<T>> = new Set();

  notify(value: T): void {
    for (const observer of this.observers) {
      try {
        observer(value);
      } catch (e) {
        // Remove broken observers
        this.unsubscribe(observer);
        throw e;
      }
    }
  }

  subscribe(observer: Subscription<T>): void {
    this.observers.add(observer);
  }

  unsubscribe(oldObserver: Subscription<T>): void {
    this.observers.delete(oldObserver);
  }
}
