import { hasToJSON } from "@shared";
import type { NotifiableObservers, ObservableGettersAndSetters, PrimitiveValueInterface } from "../../ports";
import { CallableObservable } from "./CallableObservable";

export class PrimitiveValue<T>
  extends CallableObservable<T>
  implements PrimitiveValueInterface<T>
{
  $value: T;
  constructor(
    initialValue: T,
    setterAndGetterFunction: ObservableGettersAndSetters<T, T> = ((
      ...args: [T]
    ): undefined | T => {
      if (args.length > 0) {
        const newValue = args[0];
        if (newValue === this.$value) return;
        this.$value = newValue;
        this.notify(newValue);
        return;
      }
      return this.$value;
    }) as unknown as ObservableGettersAndSetters<T, T>,
  ) {
    super(setterAndGetterFunction);
    this.$value = initialValue;
  }

  notifyCurrentValue(notifiableObservers?: NotifiableObservers<T>) {
    return this.notify(this.$value, notifiableObservers);
  }

  override valueOf(): T {
    return this.$value;
  }

  toJSON(): any {
    if (this.$value && hasToJSON(this.$value)) return this.$value.toJSON();

    return this.$value;
  }

  override toString(): string {
    // @ts-ignore
    return this.$value.toString();
  }
}