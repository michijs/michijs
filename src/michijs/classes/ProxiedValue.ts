import { hasToJSON } from "../typeWards/hasToJSON";
import type {
  Subscription,
  ObservableType,
  ProxiedValueInterface,
} from "../types";
import { deepEqual, unproxify } from "../utils";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { Observable } from "./Observable";

export class ProxiedValue<T>
  extends Observable<T>
  implements ProxiedValueInterface<T, T>
{
  private $privateValue: T;

  static transactionsInProgress = 0;
  static valuesToNotifyOnTransactionFinish = new Set<
    InstanceType<typeof ProxiedValue<any>>
  >();
  static startTransaction() {
    ProxiedValue.transactionsInProgress++;
  }
  static endTransaction() {
    if (ProxiedValue.transactionsInProgress === 1) {
      ProxiedValue.valuesToNotifyOnTransactionFinish.forEach((x) => {
        x.forceNotifyCurrentValue();
      });
      ProxiedValue.valuesToNotifyOnTransactionFinish.clear();
      // Intentionally at the end to avoid notifying twice
    }
    ProxiedValue.transactionsInProgress--;
  }

  constructor(initialValue?: T, initialObservers?: Subscription<T>[]) {
    super(initialObservers);
    this.$privateValue = initialValue!;
  }

  set $value(newValue: T) {
    if (this.shouldNotify()) {
      if (!deepEqual(newValue, this.$privateValue)) {
        this.$privateValue = newValue;
        this.notifyCurrentValue();
      }
    } else this.$privateValue = newValue;
  }
  get $value() {
    return this.$privateValue;
  }

  notifyCurrentValue() {
    if (this.shouldNotify()) {
      if (ProxiedValue.transactionsInProgress > 0)
        ProxiedValue.valuesToNotifyOnTransactionFinish.add(this);
      else this.notify(this.valueOf());
    }
  }
  forceNotifyCurrentValue() {
    this.notify(this.valueOf());
  }

  // @ts-ignore
  valueOf(): T {
    // if (typeof this.$value === 'object') {
    //   console.log('pase', this.$value)
    //   throw this.$value
    // }
    return unproxify(this.$value) as T;
  }

  public toObservableString(): ObservableType<string> {
    return useComputedObserve(() => this.toString(), [this]);
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
  toString(): string {
    // @ts-ignore
    return this.$value.toString();
  }
  unproxify() {
    return this.valueOf();
  }

  shouldNotify() {
    return !!this.observers;
  }

  typeof() {
    return typeof this.$value;
  }

  // Only for jest
  asymmetricMatch(prop) {
    return this.is(prop);
  }
}
