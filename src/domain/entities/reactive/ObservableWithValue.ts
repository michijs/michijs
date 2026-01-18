import { Observable } from "./Observable";

export class ObservableWithValue<T> extends Observable<T> {
  private $value: T;
  constructor(initialValue: T) {
    super();
    this.$value = initialValue;
  }
  set value(newValue: T) {
    removeObservableWithValueValidations: {
      if (newValue === this.$value) return;
    }
    this.$value = newValue;
    this.notify(newValue);
  }
  get value(): T {
    return this.$value;
  }
  override valueOf(): T {
    return this.$value;
  }
}
