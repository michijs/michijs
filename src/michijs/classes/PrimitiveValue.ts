import type { ObservableGettersAndSetters } from "../types";
import { hasToJSON } from "../typeWards/hasToJSON";
import { CallableObservable } from "./Observable";

export class PrimitiveValue<T> extends CallableObservable<T> {
  $value: T;
  constructor(initialValue: T) {
    super(((...args: [T]): undefined | T => {
      if (args.length > 0) {
        const newValue = args[0];
        if (newValue === this.$value) return;
        this.$value = newValue;
        this.notify(newValue);
        return;
      }
      return this.$value;
    }) as unknown as ObservableGettersAndSetters<T, T>);
    this.$value = initialValue;
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
