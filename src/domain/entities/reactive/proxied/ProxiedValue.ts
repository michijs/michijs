import type { Typeof } from "@shared";
import type {
  ProxiedValuePort,
  ObservableGettersAndSetters,
  NotifiableObservers,
  ParentSubscription,
  ProxyHandlerPort,
} from "@ports";
import { unproxify } from "../../../utils/unproxify";
import { trackAccess } from "../../../utils/dependencyTracker";
import { ReactiveValue } from "../core/ReactiveValue";

export class ProxiedValue<V>
  extends ReactiveValue<V>
  implements ProxiedValuePort<V>
{
  handler: ProxyHandlerPort<V>;
  parentSubscription: ParentSubscription<V> | undefined;
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
    initialValue: V,
    parentSubscription: ParentSubscription<V> | undefined,
    handler: ProxyHandlerPort<V>,
    setterAndGetterFunction: ObservableGettersAndSetters<V, V> = (...args) =>
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
      if (notifiableObservers)
        this.notify(unproxify(this.$value) as V, notifiableObservers);
    }
  }

  get notifiableObservers(): NotifiableObservers<V> {
    let allObservers: NotifiableObservers<V>;
    if (this.parentSubscription?.shouldNotify?.()) {
      allObservers = new Set([...this.observers]);
      allObservers.add(this.parentSubscription);
    } else allObservers = this.observers;

    if (allObservers.size === 0) return;
    return allObservers;
  }

  private rawValue(): V {
    return unproxify(this.$value) as V;
  }

  override valueOf(): V {
    trackAccess(this);
    return this.rawValue();
  }

  override toString(): string {
    // @ts-ignore
    return this.valueOf().toString();
  }
  unproxify(): V {
    return this.rawValue();
  }
  typeof(): Typeof {
    return typeof this.$value;
  }
}
