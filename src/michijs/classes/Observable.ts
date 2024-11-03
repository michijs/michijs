import type {
  NotifiableObservers,
  ObservableLike,
  ParentSubscription,
  Subscription,
} from "../types";

// Bypass Content-Security-Policy by creating a "Callable" object instead of using function
class Callable {
  constructor() {
    const closure: any = function (...args: any) { return closure._call(...args) }
    return Object.setPrototypeOf(closure, new.target.prototype)
  }
  _call() {}
}

export class Observable<T> extends Callable implements ObservableLike<T> {
  // Intentional explicit null value - it breaks proxy otherwise
  parentSubscription: ParentSubscription<T> | undefined;
  observers: Set<Subscription<T>> = new Set();

  constructor(parentSubscription?: ParentSubscription<T>) {
    super();
    this.parentSubscription = parentSubscription;
  }

  notify(
    value: T,
    observers: NotifiableObservers<T> = this.notifiableObservers,
  ): void {
    observers?.forEach((observer) => {
      observer(value);
    });
  }

  get notifiableObservers(): NotifiableObservers<T> {
    let allObservers;
    if (this.parentSubscription?.shouldNotify?.()) {
      allObservers = Array.from(this.observers);
      allObservers.push(this.parentSubscription);
    } else allObservers = this.observers;

    if (allObservers.length === 0) return;
    return allObservers;
  }

  subscribe(observer: Subscription<T>): void {
    this.observers.add(observer);
  }

  unsubscribe(oldObserver: Subscription<T>): void {
    this.observers.delete(oldObserver);
  }
}
