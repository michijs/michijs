import type {
  NotifiableObservers,
  ObservableLike,
  ParentSubscription,
  Subscription,
} from "../types";

export class Observable<T> extends Function implements ObservableLike<T> {
  // Intentional explicit null value - it breaks proxy otherwise
  parentSubscription: ParentSubscription<T> | undefined;
  observers: Subscription<T>[] = [];

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
      allObservers = [...this.observers];
      allObservers.push(this.parentSubscription);
    } else
      allObservers = this.observers;

    if (allObservers.length === 0)
      return;
    return allObservers;
  }

  subscribe(observer: Subscription<T>): void {
    this.observers.push(observer);
  }

  unsubscribe(oldObserver: Subscription<T>): void {
    this.observers = this.observers?.filter(x => x === oldObserver);
  }
}
