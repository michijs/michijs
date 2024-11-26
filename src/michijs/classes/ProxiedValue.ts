import { hasToJSON } from "../typeWards/hasToJSON";
import type {
  ObservableType,
  ProxiedValueInterface,
  Typeof,
  ObservableGettersAndSetters,
  NotifiableObservers,
  ParentSubscription,
  ObservableProxyHandler,
} from "../types";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { Observable } from "./Observable";
import { unproxify } from "../utils/unproxify";
import { getHandler } from "../hooks/proxyHandlers/getHandler";

export class ProxiedValue<T>
  extends Observable<T>
  implements ProxiedValueInterface<T, T>
{
  $value: T;
  handler: ObservableProxyHandler<any, any>;
  parentSubscription: ParentSubscription<T> | undefined;

  static transactionsInProgress = 0;
  static valuesToNotifyOnTransactionFinish = new Set<
    InstanceType<typeof ProxiedValue<any>>
  >();

  static startTransaction(): void {
    ProxiedValue.transactionsInProgress++;
  }
  static endTransaction(): void {
    if (ProxiedValue.transactionsInProgress === 1) {
      ProxiedValue.valuesToNotifyOnTransactionFinish.forEach((x) => {
        x.forceNotifyCurrentValue();
      });
      ProxiedValue.valuesToNotifyOnTransactionFinish.clear();
      // Intentionally at the end to avoid notifying twice
    }
    ProxiedValue.transactionsInProgress--;
  }

  constructor(
    initialValue: T,
    parentSubscription?: ParentSubscription<T>,
    rootObservableCallback?: () => ObservableType<any>,
    handler = getHandler(
      initialValue,
      parentSubscription,
      rootObservableCallback,
    ),
    setterAndGetterFunction: ObservableGettersAndSetters<T, T> = ((args) =>
      this.handler.apply(this, this, [
        args,
      ])) as unknown as ObservableGettersAndSetters<T, T>,
  ) {
    super(setterAndGetterFunction);
    this.handler = handler;
    this.$value = handler.getInitialValue?.(this, initialValue) ?? initialValue;
    this.parentSubscription = parentSubscription;
    // To avoid issues with isolatedDeclarations
    // this[Symbol.toStringTag] = () => this.toString();
    // this[Symbol.toPrimitive] = () => this.valueOf();
  }

  notifyCurrentValue(
    notifiableObservers: NotifiableObservers<T> = this.notifiableObservers,
  ): void {
    if (notifiableObservers)
      if (ProxiedValue.transactionsInProgress > 0)
        ProxiedValue.valuesToNotifyOnTransactionFinish.add(this);
      else this.forceNotifyCurrentValue(notifiableObservers);
  }

  forceNotifyCurrentValue(
    notifiableObservers: NotifiableObservers<T> = this.notifiableObservers,
  ): void {
    this.notify(this.valueOf(), notifiableObservers);
  }

  get notifiableObservers(): NotifiableObservers<T> {
    let allObservers;
    if (this.parentSubscription?.shouldNotify?.()) {
      allObservers = Array.from(this.observers);
      allObservers.push(this.parentSubscription);
    } else allObservers = this.observers;

    if (allObservers.length === 0) return;
    return allObservers;
  }

  // @ts-ignore
  valueOf(): T {
    return unproxify(this.$value) as T;
  }

  public toObservableString(): ObservableType<string> {
    return useComputedObserve(() => this.toString(), [this]);
  }

  public toBoolean(): boolean {
    return Boolean(this.$value);
  }

  public not(): boolean {
    return !this.$value;
  }

  public is(anotherValue: unknown): boolean {
    return this.$value === anotherValue?.valueOf();
  }

  toJSON(): any {
    if (this.$value && hasToJSON(this.$value)) return this.$value.toJSON();

    return this.$value;
  }

  override toString(): string {
    // @ts-ignore
    return this.$value.toString();
  }
  unproxify(): T {
    return this.valueOf();
  }
  typeof(): Typeof {
    return typeof this.$value;
  }
}
