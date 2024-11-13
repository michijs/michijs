import type {
  NotifiableObservers,
  ObservableLike,
  ParentSubscription,
  Subscription,
  ObservableGettersAndSetters,
} from "../types";

// Bypass Content-Security-Policy by creating a "Callable" object instead of using function
class Callable {
  constructor(setterAndGetterFunction: Function = () => {}) {
    const result = Object.setPrototypeOf(
      setterAndGetterFunction,
      new.target.prototype,
    );
    // Intentional it should not disturb arrays or strings
    delete result["length"];
    delete result["name"];
    return result;
  }
}

export class Observable<T> extends Callable implements ObservableLike<T> {
  // Intentional explicit null value - it breaks proxy otherwise
  parentSubscription: ParentSubscription<T> | undefined;
  observers: Set<Subscription<T>> = new Set();

  constructor(
    parentSubscription?: ParentSubscription<T>,
    setterAndGetterFunction?: ObservableGettersAndSetters<T, T>,
  ) {
    super(setterAndGetterFunction);
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
