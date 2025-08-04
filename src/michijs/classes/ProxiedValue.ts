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
  PrimitiveValueInterface,
} from "../types";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { CallableObservable } from "./Observable";
import { unproxify } from "../utils/unproxify";
import { getHandler } from "../hooks/proxyHandlers/getHandler";
import { useAsyncComputedObserve } from "../hooks/useAsyncComputedObserve";

export class PrimitiveValue<T>
  extends CallableObservable<T>
  implements PrimitiveValueInterface<T>
{
  $value: T;
  constructor(
    initialValue: T,
    setterAndGetterFunction: ObservableGettersAndSetters<T, T> = ((
      ...args: [T]
    ): undefined | T => {
      if (args.length > 0) {
        const newValue = args[0];
        if (newValue === this.$value) return;
        this.$value = newValue;
        this.notify(newValue);
        return;
      }
      return this.$value;
    }) as unknown as ObservableGettersAndSetters<T, T>,
  ) {
    super(setterAndGetterFunction);
    this.$value = initialValue;
  }

  notifyCurrentValue(notifiableObservers?: NotifiableObservers<T>) {
    return this.notify(this.$value, notifiableObservers);
  }

  override valueOf(): T {
    return this.$value;
  }

  toJSON(): any {
    if (this.$value && hasToJSON(this.$value)) return this.$value.toJSON();

    return this.$value;
  }

  asyncCompute<V>(
    callback: (value: T, abortSignal: AbortSignal) => Promise<V>,
    initialValue: V,
    usePrimitive?: false,
  ): ObservableTypeHelper<V, NonNullable<V>>;
  asyncCompute<V>(
    callback: (value: T, abortSignal: AbortSignal) => Promise<V>,
    initialValue: V,
    usePrimitive: true,
  ): ObservablePrimitiveType<V>;
  asyncCompute<V>(callback: (value: T, abortSignal: AbortSignal) => Promise<V>, initialValue: V, usePrimitive?: any): ObservableLike<V> {
    return useAsyncComputedObserve((abortSignal) => callback(this.valueOf(), abortSignal), initialValue, [this], {
      usePrimitive,
    }) as ObservableLike<V>;
  }
  compute<V>(
    callback: (value: T) => V,
    usePrimitive?: false,
  ): ObservableTypeHelper<V, NonNullable<V>>;
  compute<V>(
    callback: (value: T) => V,
    usePrimitive: true,
  ): ObservablePrimitiveType<V>;
  compute<V>(callback: (value: T) => V, usePrimitive?: any): ObservableLike<V> {
    return useComputedObserve(() => callback(this.valueOf()), [this], {
      usePrimitive,
    });
  }

  override toString(): string {
    // @ts-ignore
    return this.$value.toString();
  }

  public is(anotherValue: unknown): ObservablePrimitiveType<boolean> {
    return useComputedObserve(
      () => this.valueOf() === anotherValue?.valueOf(),
      [this, anotherValue],
      { usePrimitive: true },
    );
  }
}

export class ProxiedValue<T>
  extends PrimitiveValue<T>
  implements ProxiedValueInterface<T>
{
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
    super(initialValue, setterAndGetterFunction);
    this.handler = handler;
    this.$value = handler.getInitialValue?.(this, initialValue) ?? initialValue;
    this.parentSubscription = parentSubscription;
    // To avoid issues with isolatedDeclarations
    // this[Symbol.toStringTag] = () => this.toString();
    // this[Symbol.toPrimitive] = () => this.valueOf();
  }

  override notifyCurrentValue(): void {
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

  override toString(): string {
    // @ts-ignore
    return this.valueOf().toString();
  }
  unproxify(): T {
    return this.valueOf();
  }
  typeof(): Typeof {
    return typeof this.$value;
  }
}
