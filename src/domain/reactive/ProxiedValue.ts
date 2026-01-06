import { PrimitiveValue } from "./PrimitiveValue";
import type { NotifiableObservers } from "../shared/types/core";

export class ProxiedValue<T> extends PrimitiveValue<T> {
  handler: any; // Will be set by proxy system
  notifiableObservers?: NotifiableObservers<T>;

  constructor(
    initialValue: T,
    parentSubscription?: any,
    rootObservableCallback?: any,
  ) {
    super(initialValue);
    // Additional initialization if needed
  }

  notifyCurrentValue(notifiableObservers?: NotifiableObservers<T>): void {
    this.notify(this.$value, notifiableObservers);
  }

  typeof(): string {
    return typeof this.$value;
  }

  unproxify(): T {
    return this.$value;
  }
}
