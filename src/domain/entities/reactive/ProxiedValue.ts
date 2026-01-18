import { unproxify, type Typeof } from "@shared";
import type {
  ObservableType,
  ProxiedValueInterface,
  ObservableGettersAndSetters,
  NotifiableObservers,
  ParentSubscription,
  ObservableProxyHandlerInterface,
} from "../../ports";
import { PrimitiveValue } from "./PrimitiveValue";


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
    let allObservers: NotifiableObservers<T>;
    if (this.parentSubscription?.shouldNotify?.()) {
      allObservers = new Set([...this.observers]);
      allObservers.add(this.parentSubscription);
    } else allObservers = this.observers;

    if (allObservers.size === 0) return;
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
