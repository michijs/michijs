import type {
  NotifiableObservers,
  ObservableLike,
  Subscription,
  ObservableGettersAndSetters,
} from "@michijs/michijs";


export class Observable<T> implements ObservableLike<T> {
  observers: Set<Subscription<T>> = new Set();

  notify(value: T, observers: NotifiableObservers<T> = this.observers): void {
    for (const observer of observers) observer(value);
  }

  subscribe(observer: Subscription<T>): void {
    this.observers.add(observer);
  }

  unsubscribe(oldObserver: Subscription<T>): void {
    this.observers.delete(oldObserver);
  }
}

// Bypass Content-Security-Policy by creating a "Callable" object instead of using function
// @ts-ignore
export class CallableObservable<T> extends Observable<T> implements Function {
  constructor(setterAndGetterFunction?: ObservableGettersAndSetters<T, T>) {
    // Create a dummy observable to inherit its behavior
    const observableInstance = super();

    // Assign the prototype and Observable properties to the callable function
    Object.setPrototypeOf(setterAndGetterFunction, new.target.prototype);

    // Copy instance properties from the observable
    // @ts-ignore
    Object.assign(setterAndGetterFunction, observableInstance);

    removeDeletionsFromCallableObservable: {
      // Intentional it should not disturb arrays or strings
      // @ts-ignore
      delete setterAndGetterFunction["length"];
      // @ts-ignore
      delete setterAndGetterFunction["name"];
    }
    // @ts-ignore
    return setterAndGetterFunction;
  }
}