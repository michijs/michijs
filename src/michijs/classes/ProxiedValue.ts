import { hasToJSON } from "../typeWards/hasToJSON";
import type {
  ObservableType,
  ProxiedValueInterface,
  Typeof,
  ProxiedArrayInterface,
  MutableArrayProperties,
  FC,
  SingleJSXElement,
  NotifiableObservers,
  ParentSubscription,
  ListProps,
} from "../types";
import { deepEqual } from "../utils/deepEqual";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { Observable } from "./Observable";
import { unproxify } from "../utils/unproxify";
import { Target } from "./Target";
import { create } from "../DOM/create";
import { VirtualFragment } from "./VirtualFragment";

export class ProxiedValue<T>
  extends Observable<T>
  implements ProxiedValueInterface<T, T>
{
  private $privateValue: T;

  static transactionsInProgress = 0;
  static valuesToNotifyOnTransactionFinish = new Set<
    InstanceType<typeof ProxiedValue<any>>
  >();
  /**
   * Helps to self manage notifications - useful for arrays where you dont need to compare to know if the value its different
   */
  protected manualNotifications = false;

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

  constructor(initialValue?: T, parentSubscription?: ParentSubscription<T>) {
    super(parentSubscription);
    this.$privateValue = initialValue!;
    // To avoid issues with isolatedDeclarations
    // this[Symbol.toStringTag] = () => this.toString();
    // this[Symbol.toPrimitive] = () => this.valueOf();
  }

  set $value(newValue: T) {
    if (!this.manualNotifications) {
      const notifiableObservers = this.notifiableObservers;
      if (notifiableObservers) {
        if (!deepEqual(newValue, this.$privateValue)) {
          this.$privateValue = newValue;
          this.notifyCurrentValue(notifiableObservers);
        }
      } else this.$privateValue = newValue;
    } else this.$privateValue = newValue;
  }
  get $value(): T {
    return this.$privateValue;
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

export class ProxiedArray<V>
  extends ProxiedValue<V[]>
  implements ProxiedArrayInterface<V, V>, Pick<Array<V>, MutableArrayProperties>
{
  private targets = new Array<Target<V>>();
  /**
   * Removed the need to notificate. Useful if you dont have notifiableObservers
   */
  private disableNotifications;

  override notifyCurrentValue() {
    if (!this.disableNotifications) super.notifyCurrentValue();
  }

  constructor(
    initialValue: V[],
    parentSubscription?: ParentSubscription<V[]>,
    disableNotifications?: boolean,
  ) {
    super(initialValue, parentSubscription);
    this.manualNotifications = true;
    this.disableNotifications = disableNotifications;
  }

  List = <const E = FC>(
    { as: asTag, renderItem, useTemplate, ...attrs }: ListProps<E, V>,
    contextElement?: Element,
    contextNamespace?: string,
  ): Node => {
    const el = asTag
      ? (create(
          {
            jsxTag: asTag,
            attrs,
          } as SingleJSXElement,
          contextElement,
          contextNamespace,
        ) as ParentNode)
      : new VirtualFragment();

    const newTarget = new Target(
      el,
      renderItem,
      contextElement,
      contextNamespace,
      useTemplate,
    );

    this.targets.push(newTarget);

    newTarget.appendItems(this.$value);

    return el.valueOf() as Node;
  };

  $clear(): void {
    this.targets.forEach((target) => target.clear());
    this.$value = [];
    this.notifyCurrentValue();
  }

  $replace(items: V[]): number {
    if (this.$value.length)
      this.targets.forEach((target) => target.replace(items));
    else this.targets.forEach((target) => target.appendItems(items));
    this.$value = items;
    this.notifyCurrentValue();
    return items.length;
  }

  $remove(index: number): number {
    this.$value = this.$value.filter((_x, i) => i !== index);
    this.targets.forEach((target) => target.remove(index));
    this.notifyCurrentValue();
    return this.$value.length;
  }

  $swap(indexA: number, indexB: number): void {
    if (this.$value.length > indexA && this.$value.length > indexB) {
      this.targets.forEach((target) => target.swap(indexA, indexB));
      [this.$value[indexA], this.$value[indexB]] = [
        this.$value[indexB],
        this.$value[indexA],
      ];
      this.notifyCurrentValue();
    }
  }

  pop(): V | undefined {
    this.targets.forEach((target) => target.pop());
    const result = this.$value.pop();
    this.notifyCurrentValue();

    return result;
  }

  push(...items: V[]): number {
    if (items.length > 0)
      this.targets.forEach((target) => target.appendItems(items));
    const result = this.$value?.push(...items);
    this.notifyCurrentValue();

    return result;
  }
  reverse(): V[] {
    this.targets.forEach((target) => target.reverse());
    const result = this.$value.reverse();
    this.notifyCurrentValue();

    return result;
  }
  shift(): V | undefined {
    this.targets.forEach((target) => target.shift());
    const result = this.$value.shift();
    this.notifyCurrentValue();
    return result;
  }
  unshift(...items: V[]): number {
    this.targets.forEach((target) => target.prependItems(items));
    const result = this.$value.unshift(...items);
    this.notifyCurrentValue();
    return result;
  }
  fill(item: V, start?: number, end?: number): V[] {
    this.targets.forEach((target) => target.fill(item, start, end));
    const result = this.$value.fill(item, start, end);
    this.notifyCurrentValue();
    return result;
  }
  sort(compareFn?: (a: V, b: V) => number): V[] {
    const arrayCopy = [...this.$value];
    const result = this.$value.sort(compareFn);
    if (this.targets.length > 0) {
      const indexesArray = arrayCopy.reduce(
        (previousValue, currentValue, currentIndex) => {
          const newIndex = result.indexOf(currentValue);
          // To avoid repeated indexes
          if (newIndex > currentIndex) {
            previousValue.push({
              currentIndex,
              newIndex,
            });
          }
          return previousValue;
        },
        new Array<{ currentIndex: number; newIndex: number }>(),
      );
      this.targets.forEach((target) => {
        indexesArray.forEach(({ currentIndex, newIndex }) => {
          target.swap(currentIndex, newIndex);
        });
      });
      this.notifyCurrentValue();
    }
    return result;
  }
  splice(start: number, deleteCount = 0, ...items: V[]): V[] {
    if (start === 0 && deleteCount >= this.$value.length) this.$replace(items);
    else {
      this.targets.forEach((target) =>
        target.splice(start, deleteCount, items),
      );
      this.$value.splice(start, deleteCount, ...items);
    }
    this.notifyCurrentValue();
    return this.$value;
  }
}
