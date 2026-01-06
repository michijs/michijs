import { Observable } from "./Observable";

export class PrimitiveValue<T> extends Observable<T> {
  $value: T;

  constructor(initialValue: T) {
    super();
    this.$value = initialValue;
  }

  get(): T {
    return this.$value;
  }

  set(newValue: T): void {
    if (newValue === this.$value) return;
    this.$value = newValue;
    this.notify(newValue);
  }

  override valueOf(): T {
    return this.$value;
  }
}
