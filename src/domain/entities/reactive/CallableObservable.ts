import type { ObservableGettersAndSetters } from "../../ports";
import { Callable } from "./Callable";
import { Observable } from "./Observable";

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
