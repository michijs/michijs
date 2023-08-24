import { hasToJSON } from "../typeWards/hasToJSON";
import { ObserverCallback } from "../types";
import { deepEqual } from "../utils";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { Observable } from "./Observable";

export class ProxiedValue<T> extends Observable<T> {
  private value: T;

  constructor(initialValue?: T, initialObservers?: ObserverCallback<T>[]) {
    super(initialObservers);
    this.value = initialValue!
  }

  set $value(newValue: T) {
    if (this.shouldCheckForChanges()) {
      if (!deepEqual(newValue, this.value)) {
        this.value = newValue;
        this.notify(newValue);
      }
    } else this.value = newValue;
  }
  get $value() {
    return this.value;
  }

  notifyCurrentValue(){
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

  shouldCheckForChanges() {
    return !!this.observers;
  }
}
