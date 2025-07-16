import type {
  NotifiableObservers,
  ObservableLike,
  Subscription,
  ObservableGettersAndSetters,
} from "../types";
import { GarbageCollectedEvent } from "./GarbageCollectedEvent";

export class Observable<T> implements ObservableLike<T> {
  observers: Set<Subscription<T>> = new Set();

  notify(value: T, observers: NotifiableObservers<T> = this.observers): void {
    for (const observer of observers)
      try {
        observer(value);
      } catch (e) {
        removeObservablesGarbageCollection: {
          if (e instanceof GarbageCollectedEvent) {
            this.unsubscribe(observer);
            continue;
          } else throw e;
        }
        // @ts-ignore
        throw e;
      }
  }

  subscribe(observer: Subscription<T>): void {
    this.observers.add(observer);
  }

  unsubscribe(oldObserver: Subscription<T>): void {
    this.observers.delete(oldObserver);
  }
}

// Bypass Content-Security-Policy by creating a "Callable" object instead of using function
export class Callable implements Function {
  constructor(setterAndGetterFunction: Function = () => { }) {
    const result = Object.setPrototypeOf(
      setterAndGetterFunction,
      new.target.prototype,
    );
    // Intentional it should not disturb arrays or strings
    delete result["length"];
    delete result["name"];
    return result;
  }
  declare apply: (this: Function, thisArg: any, argArray?: any) => void;
  declare call: (this: Function, thisArg: any, ...argArray: any[]) => void;
  declare bind: (this: Function, thisArg: any, ...argArray: any[]) => void;
  declare prototype: any;
  declare length: number;
  declare arguments: any;
  declare caller: Function;
  declare name: string;
  declare [Symbol.hasInstance]: (value: any) => boolean;
  declare [Symbol.metadata]: DecoratorMetadataObject | null;
}

export class CallableObservable<T> extends Observable<T> implements Function {
  constructor(setterAndGetterFunction?: ObservableGettersAndSetters<T, T>) {
    // Create a dummy observable to inherit its behavior
    const observableInstance = super();

    const callable = new Callable(setterAndGetterFunction);
    // Assign the prototype and Observable properties to the callable function
    Object.setPrototypeOf(callable, new.target.prototype);

    // Copy instance properties from the observable
    Object.assign(callable, observableInstance);

    // @ts-ignore
    return callable;
  }
  declare apply: (this: Function, thisArg: any, argArray?: any) => void;
  declare call: (this: Function, thisArg: any, ...argArray: any[]) => void;
  declare bind: (this: Function, thisArg: any, ...argArray: any[]) => void;
  declare prototype: any;
  declare length: number;
  declare arguments: any;
  declare caller: Function;
  declare name: string;
  declare [Symbol.hasInstance]: (value: any) => boolean;
  declare [Symbol.metadata]: DecoratorMetadataObject | null;
}