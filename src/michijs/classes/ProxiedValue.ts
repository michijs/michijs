import { hasToJSON } from "../typeWards/hasToJSON";
import { ObserverCallback } from "../types";
import { deepEqual } from "../utils";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { Observable } from "./Observable";

export class ProxiedValue<T> extends Observable<T> {
  private $privateValue: T;

  constructor(initialValue?: T, initialObservers?: ObserverCallback<T>[]) {
    super(initialObservers);
    this.$privateValue = initialValue!
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
    this.notify(this.$value)
  }

  // Avoids typescript errors
  protected valueOf() {
    return this.$value;
  }

  public toString(props) {
    // @ts-ignore
    return useComputedObserve(() => this.$value?.toString?.(props), [this]);
  }

  toJSON() {
    if (this.$value && hasToJSON(this.$value)) return this.$value.toJSON();

    return this.$value;
  }

  [Symbol.toPrimitive]() {
    return this.valueOf()
  }

  shouldCheckForChanges() {
    return !!this.observers;
  }
}