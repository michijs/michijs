import type {
  NotifiableObservers,
  ObservableLike,
  Subscription,
  ObservableGettersAndSetters,
} from "../types";

// Bypass Content-Security-Policy by creating a "Callable" object instead of using function
class Callable implements Function {
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
  apply: (this: Function, thisArg: any, argArray?: number) => void;
  call: (this: Function, thisArg: any, ...argArray: number[]) => void;
  bind: (this: Function, thisArg: any, ...argArray: number[]) => void;
  prototype: any;
  length: number;
  arguments: number;
  caller: Function;
  name: string;
  [Symbol.hasInstance]: (value: any) => boolean;
  [Symbol.metadata]: DecoratorMetadataObject | null;
}

export class Observable<T> extends Callable implements ObservableLike<T> {
  observers: Set<Subscription<T>> = new Set();

  constructor(setterAndGetterFunction?: ObservableGettersAndSetters<T, T>) {
    super(setterAndGetterFunction);
  }

  notify(value: T, observers: NotifiableObservers<T> = this.observers): void {
    for (const observer of observers) {
      observer(value);
    }
  }

  subscribe(observer: Subscription<T>): void {
    this.observers.add(observer);
  }

  unsubscribe(oldObserver: Subscription<T>): void {
    this.observers.delete(oldObserver);
  }
}
