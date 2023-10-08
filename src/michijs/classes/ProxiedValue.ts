import { hasToJSON } from "../typeWards/hasToJSON";
import type { ObserverCallback, ObservableType } from "../types";
import { deepEqual } from "../utils";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { Observable } from "./Observable";

export class ProxiedValue<T> extends Observable<T> {
  private $privateValue: T;

  constructor(initialValue?: T, initialObservers?: ObserverCallback<T>[]) {
    super(initialObservers);
    this.$privateValue = initialValue!;
  }

  set $value(newValue: T) {
    if (this.shouldCheckForChanges()) {
      if (!deepEqual(newValue, this.$privateValue)) {
        this.$privateValue = newValue;
        this.notify(newValue);
      }
    } else this.$privateValue = newValue;
  }
  get $value() {
    return this.$privateValue;
  }

  notifyCurrentValue() {
    this.notify(this.$value);
  }

  // Avoids typescript errors
  protected valueOf() {
    return this.$value;
  }

  public toObservableString(): ObservableType<string> {
    // @ts-ignore
    return useComputedObserve(() => this.$value?.toString?.(), [this]);
  }

  public toBoolean() {
    return Boolean(this.$value);
  }

  public not() {
    return !this.$value;
  }

  public is(anotherValue: unknown): boolean {
    return this.$value === anotherValue?.valueOf();
  }

  toJSON() {
    if (this.$value && hasToJSON(this.$value)) return this.$value.toJSON();

    return this.$value;
  }

  [Symbol.toPrimitive]() {
    return this.valueOf();
  }
  protected [Symbol.toStringTag]() {
    return this.toString();
  }

  shouldCheckForChanges() {
    return !!this.observers;
  }

  typeof() {
    return typeof this.valueOf();
  }

  // Only for jest
  asymmetricMatch(prop) {
    return this.is(prop);
  }
}
