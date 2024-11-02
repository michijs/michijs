import type {
  NotifiableObservers,
  ObservableLike,
  Subscription,
} from "../types";

export class Observable<T> extends Function implements ObservableLike<T> {
  // Intentional explicit null value - it breaks proxy otherwise
  observers: Set<Subscription<T>> | null = null;

  constructor(initialObservers?: Subscription<T>[]) {
    super();
    if (initialObservers) this.observers = new Set(initialObservers);
  }

  notify(
    value: T,
    observers: Subscription<T>[] | null = this.notifiableObservers,
  ): void {
    observers?.forEach((observer) => {
      observer(value);
    });
  }

  get notifiableObservers(): NotifiableObservers<T> {
    if (!this.observers) return null;
    const notifiableObservers = Array.from(this.observers).filter(
      (x) => !x.ignore?.(),
    );
    if (notifiableObservers.length === 0) return null;
    return notifiableObservers;
  }

  subscribe(observer: Subscription<T>): void {
    if (this.observers) this.observers.add(observer);
    else this.observers = new Set([observer]);
  }

  unsubscribe(oldObserver: Subscription<T>): void {
    this.observers?.delete(oldObserver);
  }
}
