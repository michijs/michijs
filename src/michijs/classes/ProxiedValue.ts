import { hasToJSON } from "../typeWards/hasToJSON";
import type {
  ObservableType,
  ProxiedValueInterface,
  Typeof,
  ObservableGettersAndSetters,
  NotifiableObservers,
  ParentSubscription,
  ObservableProxyHandlerInterface,
  ObservablePrimitiveType,
  ObservableTypeHelper,
  ObservableLike,
} from "../types";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { CallableObservable } from "./Observable";
import { unproxify } from "../utils/unproxify";
import { getHandler } from "../hooks/proxyHandlers/getHandler";

export class ProxiedValue<T>
  extends CallableObservable<T>
  implements ProxiedValueInterface<T> {
  $value: T;
  handler: ObservableProxyHandlerInterface<T>;
  parentSubscription: ParentSubscription<T> | undefined;
  needsToNotify: boolean | undefined;
  onTransaction: boolean | undefined;
  startTransaction() {
    this.onTransaction = true;
    this.needsToNotify = false;
  }
  endTransaction() {
    this.onTransaction = false;
    if (this.needsToNotify) this.notifyCurrentValue();
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
    setterAndGetterFunction: ObservableGettersAndSetters<T, T> = (...args) =>
      this.handler.apply(this, this, args),
  ) {
    super(setterAndGetterFunction);
    this.handler = handler;
    this.$value = handler.getInitialValue?.(this, initialValue) ?? initialValue;
    this.parentSubscription = parentSubscription;
    // To avoid issues with isolatedDeclarations
    // this[Symbol.toStringTag] = () => this.toString();
    // this[Symbol.toPrimitive] = () => this.valueOf();
  }
  compute<V>(callback: (value: T) => V, usePrimitive?: false): ObservableTypeHelper<V, NonNullable<V>>;
  compute<V>(callback: (value: T) => V, usePrimitive: true): ObservablePrimitiveType<V>;
  compute<V>(callback: (value: T) => V, usePrimitive?: any): ObservableLike<V> {
    return useComputedObserve(() => callback(this.$value), [this], { usePrimitive });
  }

  notifyCurrentValue(): void {
    if (this.onTransaction) this.needsToNotify = true;
    else {
      const notifiableObservers = this.notifiableObservers;
      if (notifiableObservers) this.notify(this.valueOf(), notifiableObservers);
    }
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

  override valueOf(): T {
    return unproxify(this.$value) as T;
  }

  public is(anotherValue: unknown): ObservableType<boolean> {
    return useComputedObserve(
      () => this.$value === anotherValue?.valueOf(),
      [this, anotherValue],
    );
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
