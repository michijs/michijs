import { hasToJSON } from "../typeWards/hasToJSON";
import { Observable } from "./Observable";

export class PrimitiveValue<T> extends Observable<T> {
  $value: T;
  constructor(initialValue: T) {
    // @ts-ignore
    super((newValue) => {
      if (newValue) {
        this.$value = newValue;
        this.notify(newValue);
        return;
      }
      return this.$value;
    });
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
