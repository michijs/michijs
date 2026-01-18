import type { Typeof, IsAny, GetPrimitiveType, GetPrimitiveTypeClass, ReadWriteArray, ReadWriteMap, ReadWriteSet } from "@shared";

// End Auxiliar Types
export interface Subscription<T> {
  (signal: T): void;
}
export interface ParentSubscription<T> extends Subscription<T> {
  shouldNotify(): any;
}
export type RefSubscription<T, E> = (signal: T, el: E) => void;
export interface CompatibleSubscription {
  // its optional to keep compatibility with others observers like redux
  (): void;
}


export type ObservableTypeOrConst<T> =
  | ObservablePrimitiveType<T>
  | ObservableType<T>
  | T;
export type ObservableOrConst<T> = ObservableLike<T> | T;
export type ObservableOrConstOrPromise<T> = ObservableOrConst<T> | Promise<T>;
export interface ObservableLike<T> {
  subscribe(observer: Subscription<T>): void;
  notify(value: T, observers: NotifiableObservers<T>): void;
  unsubscribe(observer: Subscription<T>): void;
}
export interface CompatibleObservableLike {
  subscribe(observer: CompatibleSubscription): void;
}

export interface ObservableProxyHandlerInterface<T>
  extends Required<Pick<ProxyHandler<ProxiedValueInterface<T>>, "apply">>,
  Omit<ProxyHandler<ProxiedValueInterface<T>>, "apply"> {
  // TODO: Should be observableType
  getInitialValue?(target: ProxiedValueInterface<T>, unproxifiedValue: T): any;
  applyNewValue?(target: ProxiedValueInterface<T>, unproxifiedValue: T): any;
}


export interface ProxiedArrayInterface<RV, SV = ObservableType<RV>> {
  /**
   * Removes all the list elements
   */
  $clear(): void;
  /**
   * Replace all the list elements
   */
  $replace(...items: (SV | RV)[]): number;
  /**
   * Removes an item
   */
  $remove(index: number): void;
  /**
   * Swaps two items
   */
  $swap(indexA: number, indexB: number): void;

  /**
   * Is a proxy that allows you to avoid using dom diff algorithms to render lists.
   * This allows it to have a performance close to vanilla js.
   * An operation on the data implies an operation on the associated elements.
   */
  List<const E = FC>(
    props: ListProps<E, SV>,
    factory?: ElementFactoryType,
  ): Node;
}


export type NotifiableObservers<T> = Set<Subscription<T>> | undefined;

export interface PrimitiveValueInterface<RV> extends ObservableLike<RV> {
  $value: RV;
  notifyCurrentValue(notifiableObservers?: NotifiableObservers<RV>): void;
  valueOf(): RV;
  toString(): string;
}

export interface ProxiedValueInterface<RV> extends PrimitiveValueInterface<RV> {
  handler: ObservableProxyHandlerInterface<RV>;
  typeof(): Typeof;
  unproxify(): RV;
}

export interface ObservableGettersAndSetters<RV, SV> {
  (newValue: SV | RV): void;
  (): RV;
}

export interface ObservableValue<RV, SV = RV>
  extends ProxiedValueInterface<RV>,
  ObservableGettersAndSetters<RV, SV> { }

export interface ObservablePrimitiveType<RV>
  extends PrimitiveValueInterface<RV>,
  ObservableGettersAndSetters<RV, RV> { }

export interface PrimitiveObservable<RV> extends ObservableValue<RV, RV> { }


export interface ObservableDate
  extends PrimitiveObservable<Date>,
  Omit<Date, "valueOf"> { }

// Needs to be partial to allow asignation operation
export type ObservableTypeHelper<Y, T = NonNullable<Y>> = IsAny<T> extends true
  ? any
  : // Intentional - otherwise it doesnt work
  [Y] extends [ObservableLike<any>]
  ? Y
  : [T] extends [Array<infer V>]
  ? ObservableArray<V>
  : [T] extends [Promise<infer V>]
  ? ObservableComplexObject<Promise<V>>
  : [T] extends [(...args: infer A) => infer R]
  ? (...args: A) => ObservableType<R>
  : [T] extends [Map<infer K, infer V>]
  ? ObservableMap<K, V>
  : [T] extends [Set<infer V>]
  ? ObservableSet<V>
  : [T] extends [Date]
  ? ObservableDate
  : [T] extends [object]
  ? // ? ExtendsObject<T> extends true
  ObservableObject<Y>
  : // : ObservableComplexObject<Y>
  PrimitiveObservable<GetPrimitiveType<Y>> &
  GetPrimitiveTypeClass<T>;

export type ObservableType<Y> = ObservableTypeHelper<Y>;

export type Unproxify<T> = IsAny<T> extends true
  ? any
  : T extends ObservableLike<infer Y>
  ? [Y] extends [object]
  ? { [k in keyof Y]: Unproxify<Y[k]> }
  : Y
  : T;

export type ObservableComplexObject<
  RV,
// It should be this way but typescript is ignoring undefined for no reason.
// Example ObservableComplexObject<File | undefined> Gets File & PrimitiveObservableValue<File | undefined>;
// It should be Gets (File | undefined) & PrimitiveObservableValue<File | undefined>
// RV & PrimitiveObservableValue<RV>
> = PrimitiveObservable<RV>;

export type ObservableObjectHelper<
  RV,
  SV = {
    [K in keyof RV]-?: ObservableType<RV[K]>;
  },
> = SV & ObservableValue<RV, SV>;

export type ObservableObject<RV> = ObservableObjectHelper<RV>;


interface ObservableArrayHelper<RV, SV = ObservableType<RV>>
  extends ReadWriteArray<RV, SV>,
  ProxiedArrayInterface<RV, SV>,
  ProxiedValueInterface<RV[]>,
  ObservableGettersAndSetters<RV[], SV[]> { }

export interface ObservableArray<RV> extends ObservableArrayHelper<RV> { }

// TODO: we dont support common interfaces yet
export interface ObservableMapHelper<K, RV, SV = ObservableType<RV>>
  extends ReadWriteMap<K, RV, SV>,
  ObservableValue<Map<K, SV>, Map<K, SV>> { }
export interface ObservableMap<K, RV> extends ObservableMapHelper<K, RV> { }
export interface ObservableSetHelper<RV, SV = ObservableType<RV>>
  extends ReadWriteSet<RV, SV>,
  ObservableValue<Set<SV>, Set<SV>> { }
export interface ObservableSet<RV> extends ObservableSetHelper<RV> { }

export type ObservableNonNullablePrimitiveType =
  ObservableType<NonNullablePrimitiveType>;
export type NonNullablePrimitiveType = bigint | string | number | boolean;
export type PrimitiveType =
  | NonNullablePrimitiveType
  | ObservableNonNullablePrimitiveType
  | null
  | undefined;
