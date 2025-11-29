import type { EventDispatcher } from "./classes/EventDispatcher";
import type { MappedIdGenerator } from "./classes/MappedIdGenerator";
import type { Observable } from "./classes/Observable";
import type {
  HTMLElements,
  CSSProperties,
  GlobalEvents,
} from "./generated/htmlType";
import type { SearchParams } from "./routing/types";

export type Platform =
  | "ios"
  | "android"
  | "macos"
  | "chromeos"
  | "windows"
  | "unknown";

export type Browser =
  | "edge"
  | "chrome"
  | "firefox"
  | "safari"
  | "opera"
  | "android"
  | "iphone"
  | "unknown";
export type StringKeyOf<T extends object> = Extract<keyof T, string>;
export type CSSVar<T extends string> = <
  V extends undefined | string | number = undefined,
>(
  defaultValue?: V,
) => `var(${KebabCase<T>}${V extends undefined ? "" : `,${V}`})`;
export type CssVariablesObject<
  T extends object | unknown,
  PK extends string = "-",
> = IsAny<T> extends true
  ? any
  : T extends object
    ? {
        [k in StringKeyOf<T>]: CssVariablesObject<T[k], `${PK}-${k}`>;
      }
    : CSSVar<PK> & string;
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? A
  : B;
type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    {
      [Q in P]: T[P];
    },
    {
      -readonly [Q in P]: T[P];
    },
    P
  >;
}[keyof T];
export type PickWritable<E> = Pick<E, WritableKeys<E>>;

// export type LowerCaseCharacters = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
export type UpperCaseCharacters =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type WordSeparators = "-" | "_" | " ";
export type ArrayWithOneOrMoreElements<T> = [T, ...T[]];

export type ExtendableComponent<T> = {
  as?: T;
} & GetElementProps<T>;

// Intentionally using never - otherwise generics does not work
export type ExtendableComponentWithoutChildren<T = undefined> =
  ExtendableComponent<T> & {
    children?: never;
  };

export type SplitIncludingDelimiters<
  Source extends string,
  Delimiter extends string,
> = Source extends ""
  ? []
  : Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}`
    ? Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
      ? UsedDelimiter extends Delimiter
        ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}`
          ? [
              ...SplitIncludingDelimiters<FirstPart, Delimiter>,
              UsedDelimiter,
              ...SplitIncludingDelimiters<SecondPart, Delimiter>,
            ]
          : never
        : never
      : never
    : [Source];

type StringPartToDelimiterCase<
  StringPart extends string,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = StringPart extends UsedWordSeparators
  ? Delimiter
  : StringPart extends UsedUpperCaseCharacters
    ? `${Delimiter}${Lowercase<StringPart>}`
    : StringPart;

type StringArrayToDelimiterCase<
  Parts extends any[],
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? `${StringPartToDelimiterCase<
      FirstPart,
      UsedWordSeparators,
      UsedUpperCaseCharacters,
      Delimiter
    >}${StringArrayToDelimiterCase<
      RemainingParts,
      UsedWordSeparators,
      UsedUpperCaseCharacters,
      Delimiter
    >}`
  : "";

export type DelimiterCase<
  Value,
  Delimiter extends string,
> = Value extends string
  ? StringArrayToDelimiterCase<
      SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
      WordSeparators,
      UpperCaseCharacters,
      Delimiter
    >
  : Value;

export interface MichiAttributes<E> {
  children?: JSX.Element;
  _?: {
    [k in WritableKeys<E>]?: ObservableTypeOrConst<E[k] | undefined | null>;
  };
}
export interface MichiAttributesCustomElement<E> {
  children?: JSX.Element;
  _?: {
    [k in WritableKeys<E>]?: E[k] extends ObservableComplexObject<infer U>
      ? ObservableLike<U | undefined | null> | U | undefined | null
      : ObservableTypeOrConst<E[k] | undefined | null> | undefined | null;
  };
}

export type KebabCase<Value> = DelimiterCase<Value, "-">;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

// End Auxiliar Types
export interface Subscription<T> {
  (signal: T): void;
}
export interface ParentSubscription<T> extends Subscription<T> {
  (signal: T): void;
  shouldNotify(): any;
}
export type RefSubscription<T, E> = (signal: T, el: E) => void;
export interface CompatibleSubscription {
  // its optional to keep compatibility with others observers like redux
  (): void;
}

export interface CustomNavigateEvent
  extends Pick<
      NavigateEvent,
      "downloadRequest" | "canIntercept" | "navigationType"
    >,
    Partial<Pick<NavigateEvent, "formData">> {}

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

export interface MichiProperties
  extends Lifecycle,
    LifecycleInternals,
    Partial<
      Pick<
        ElementInternals,
        | "checkValidity"
        | "reportValidity"
        | "form"
        | "validity"
        | "validationMessage"
        | "willValidate"
      >
    > {
  // props?: unknown,
  readonly $michi: {
    store: ObservableType<AttributesType>;
    alreadyRendered: boolean;
    adoptedBy?: Window & typeof globalThis;
    shadowRoot?: ShadowRoot | null;
    styles: {
      className?: string;
      cssVariables?: CSSStyleSheet;
      computedStyleSheet?: CSSStyleSheet;
      mappedAdoptedStyleSheets?: CSSStyleSheet[];
    };
    idGen?: MappedIdGenerator["getId"];
    internals?: ElementInternals;
  };
  render?(): JSX.Element;
  /**Allows to get a child element from the host with the selector */
  child<T = HTMLElement>(
    selector: string,
  ): (T extends new (props: any) => infer Y ? Y : T) | undefined;
  /**Create unique IDs with a discernible key */
  readonly idGen: MappedIdGenerator["getId"];
  readonly name: string | null;
  readonly type: string;
}

export interface CustomElementWithCallbacks extends HTMLElement {
  disconnectedCallback?(): void;
  connectedCallback?(): void;
  attributeChangedCallback?(
    name: string,
    oldValue: unknown,
    newValue: unknown,
  ): void;
}

export interface MichiCustomElement extends HTMLElement, MichiProperties {}

export type ListProps<E, SV> = ExtendableComponentWithoutChildren<E> & {
  renderItem: FC<SV>;
  /**
   * Uses cloneNode instead of creating every item separately. It is twice as fast as not using a template
   *
   * **Warning:** It only works with plain objectJSXElements or classJSXElements
   *
   * Do not use conditions, arrays or fragments on the renderItem function if this is enabled
   */
  useTemplate?: boolean;
};

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

export type Typeof =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function";

export type NotifiableObservers<T> = Set<Subscription<T>> | undefined;

export interface PrimitiveValueInterface<RV> extends ObservableLike<RV> {
  $value: RV;
  is(anotherValue: unknown): ObservablePrimitiveType<boolean>;
  notifyCurrentValue(notifiableObservers?: NotifiableObservers<RV>): void;

  asyncCompute<T>(
    callback: (value: RV, abortSignal: AbortSignal) => Promise<T>,
    initialValue: T,
    usePrimitive?: false,
  ): ObservableType<T>;
  asyncCompute<T>(
    callback: (value: RV, abortSignal: AbortSignal) => Promise<T>,
    initialValue: T,
    usePrimitive: true,
  ): ObservablePrimitiveType<T>;
  compute<V>(
    callback: (value: RV) => V,
    usePrimitive: true,
  ): ObservablePrimitiveType<V>;
  compute<V>(
    callback: (value: RV) => V,
    usePrimitive?: false,
  ): ObservableType<V>;
  compute<V>(
    callback: (value: RV) => V,
    usePrimitive: true,
  ): ObservablePrimitiveType<V>;
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
    ObservableGettersAndSetters<RV, SV> {}

export interface ObservablePrimitiveType<RV>
  extends PrimitiveValueInterface<RV>,
    ObservableGettersAndSetters<RV, RV> {}

export interface PrimitiveObservable<RV> extends ObservableValue<RV, RV> {}

type GetPrimitiveTypeClass<T> = T extends boolean
  ? Boolean
  : T extends number
    ? Number
    : T extends string
      ? String
      : T extends bigint
        ? BigInt
        : T extends symbol
          ? Symbol
          : {};

// For some reason if you use false it takes the boolean as a const
type GetPrimitiveType<T> = T extends boolean
  ? boolean
  : //   : T extends number
    //     ? number
    //     : T extends string
    //       ? string
    //       : T extends bigint
    //         ? bigint
    //         : T extends symbol
    //           ? symbol
    T;

// Doesnt work properly
// type ExtendsObject<V extends object> = V extends { prototype: any }
//   ? false
//   : V extends new (
//         ...args: any
//       ) => any
//     ? InstanceType<V> extends { prototype: any }
//       ? false
//       : true
//     : V extends Element
//       ? false
//       : true;

export type IsAny<T> = 0 extends 1 & T ? true : false;

export interface RequestInitUseFetch<B> extends Omit<RequestInit, "body"> {
  body?: B;
}

export interface HistoryManagerType extends Observable<string | URL> {
  ignoreHashes?: boolean;
  canGoBack(fallbackUrl?: ObservableOrConst<string | URL>): boolean;
  back(fallbackUrl?: ObservableOrConst<string | URL>): void;
  replaceCurrentUrl(url: ObservableOrConst<string | URL>): void;
  push(url: ObservableOrConst<string | URL>): void;
  matches(url: ObservableOrConst<string>, flexible?: boolean): boolean;
  shouldShowUnloadPrompt?(): boolean;
}

export interface DoFetchProps<
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
> extends RequestInitUseFetch<ObservableOrConst<B>> {
  input: string;
  searchParams?: { [k in keyof S]: ObservableOrConst<S[k]> };
}

export type usePromiseShouldWait = ObservableTypeOrConst<Promise<any>>[];

export type UseFetchCallback<
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
> = () => DoFetchProps<S, B> | Promise<DoFetchProps<S, B>>;

export interface UseComputedObserveSharedOptions {
  onBeforeUpdate?(): void;
  onAfterUpdate?(): void;
}
export interface UseComputedObservePrimitiveOptions
  extends UseComputedObserveSharedOptions {
  usePrimitive: true;
}
export interface UseComputedObserveOptions
  extends UseComputedObserveSharedOptions {
  usePrimitive?: false;
}
export interface UseWatch {
  <T>(callback: () => T, deps?: useWatchDeps): void;
}

export interface UsePureFunction {
  <T>(callback: () => T, deps: useWatchDeps): () => T;
}
export interface UseSearchParams {
  <
    // Removed because it doesnt work with observables
    // T extends Record<string, unknown> = Record<string, unknown>,
    T = AnyObject,
  >(): ObservableType<T>;
}

export interface TypedIDBObjectStoreParameters<T extends AnyObject>
  extends Omit<IDBObjectStoreParameters, "keyPath"> {
  keyPath?: keyof T | (keyof T)[] | null;
}

export type ObjectStore<T extends AnyObject> = {
  [k in keyof T]?: TypedIDBObjectStoreParameters<T[k]>;
};

export interface UseIndexedDB {
  <T extends AnyObject>(
    name: string,
    objectsStore: ObjectStore<T>,
    version?: number,
  ): IndexeddbObservableResult<T>;
}

export interface InitDb {
  <T extends AnyObject>(
    name: string,
    objectsStore: ObjectStore<T>,
    version?: number,
  ): Promise<IDBDatabase>;
}

/** This example shows a variety of different uses of object stores, from updating the data structure with IDBObjectStore.createIndex inside an onupgradeneeded function, to adding a new item to our object store with IDBObjectStore.add. For a full working example, see our To-do Notifications app (view example live.) */
export interface TypedIDBObjectStore<T extends AnyObject>
  extends Omit<IDBObjectStore, "add" | "get" | "getAll" | "put"> {
  /**
   * Adds or updates a record in store with the given value and key.
   *
   * If the store uses in-line keys and key is specified a "DataError" DOMException will be thrown.
   *
   * If put() is used, any existing record with the key will be replaced. If add() is used, and if a record with the key already exists the request will fail, with request's error set to a "ConstraintError" DOMException.
   *
   * If successful, request's result will be the record's key.
   */
  add(value: T, key?: IDBValidKey): IDBRequest<IDBValidKey>;
  /**
   * Retrieves the value of the first record matching the given key or key range in query.
   *
   * If successful, request's result will be the value, or undefined if there was no matching record.
   */
  get(query: IDBValidKey | IDBKeyRange): IDBRequest<T>;
  /**
   * Retrieves the values of the records matching the given key or key range in query (up to count if given).
   *
   * If successful, request's result will be an Array of the values.
   */
  getAll(
    query?: IDBValidKey | IDBKeyRange | null,
    count?: number,
  ): IDBRequest<T[]>;
  /**
   * Adds or updates a record in store with the given value and key.
   *
   * If the store uses in-line keys and key is specified a "DataError" DOMException will be thrown.
   *
   * If put() is used, any existing record with the key will be replaced. If add() is used, and if a record with the key already exists the request will fail, with request's error set to a "ConstraintError" DOMException.
   *
   * If successful, request's result will be the record's key.
   */
  put(value: T, key?: IDBValidKey): IDBRequest<IDBValidKey>;
}

export type PromisableTypedIDBObjectStore<T extends AnyObject> = {
  [k in keyof TypedIDBObjectStore<T>]: TypedIDBObjectStore<T>[k] extends (
    ...args: any
  ) => any
    ? (
        ...args: Parameters<TypedIDBObjectStore<T>[k]>
      ) => Promise<
        | (ReturnType<TypedIDBObjectStore<T>[k]> extends IDBRequest<infer R>
            ? R
            : ReturnType<TypedIDBObjectStore<T>[k]>)
        | undefined
      >
    : Promise<TypedIDBObjectStore<T>[k]>;
};

export type IndexeddbObservableResult<T extends AnyObject> = {
  [k in keyof T]: PromisableTypedIDBObjectStore<T[k]>;
} & ObservableLike<keyof T>;

export type useWatchDeps = any[];

export interface DoFetch {
  <
    R,
    S extends SearchParams = undefined,
    B extends AnyObject | undefined | string = undefined,
  >(
    request: DoFetchProps<S, B>,
  ): Promise<R>;
}

export interface UseFetch {
  <
    R,
    S extends SearchParams = undefined,
    B extends AnyObject | undefined | string = undefined,
  >(
    callback: UseFetchCallback<S, B>,
    shouldWait?: usePromiseShouldWait,
  ): PromiseResult<Promise<R>>;
}

export interface UsePromise {
  <R>(
    callback: () => Promise<R>,
    shouldWait?: usePromiseShouldWait,
  ): PromiseResult<Promise<R>>;
}

export interface UseStorage {
  <T extends object>(item: T, storage?: Storage): ObservableType<T>;
}

export interface UseHash {
  <T extends string = string>(): ObservableType<Record<T, boolean | undefined>>;
}

/**
 * Interface representing the result of a fetch operation.
 * @template R Type of the expected response data.
 */
export interface PromiseResult<R> {
  /**
   * The promise
   */
  promise: ObservablePrimitiveType<R>;
  /**
   * Call again the promise. Available after first call
   */
  recall(): void;
}

export interface UseObserveInternal {
  <T>(
    item?: T,
    parentSubscription?: ParentSubscription<T>,
    /**
     * For functions inside an observable
     */
    rootObservableCallback?: () => ObservableType<unknown>,
  ): ObservableType<T>;
}

export interface UseObserve {
  <T>(item: T, usePrimitive?: false): ObservableType<T>;
  <T>(item: T, usePrimitive: true): ObservablePrimitiveType<T>;
}

export interface UseAsyncComputedObserve {
  <T>(
    callback: (abortSignal: AbortSignal) => Promise<T>,
    initialValue: T,
    deps: useWatchDeps,
    options?: UseComputedObserveOptions,
  ): ObservableType<T>;
  <T>(
    callback: (abortSignal: AbortSignal) => Promise<T>,
    initialValue: T,
    deps: useWatchDeps,
    options?: UseComputedObservePrimitiveOptions,
  ): ObservablePrimitiveType<T>;
}

export interface UseComputedObserve {
  <T>(
    callback: () => T,
    deps: useWatchDeps,
    options: UseComputedObservePrimitiveOptions,
  ): ObservablePrimitiveType<T>;
  <T>(
    callback: () => T,
    deps: useWatchDeps,
    options?: UseComputedObserveOptions,
  ): ObservableType<T>;
}
export interface UseStringTemplate {
  (
    templateStringsArray: TemplateStringsArray,
    ...props: ObservableOrConst<string | number | undefined>[]
  ): ObservableType<string>;
}

export interface ObservableDate
  extends PrimitiveObservable<Date>,
    Omit<Date, "valueOf"> {}

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

export type MutableArrayNewItemsProperties =
  | "push"
  | "unshift"
  | "fill"
  | "splice";
export type MutableMapNewItemsProperties = "set";
export type MutableSetNewDeleteItemsProperties = "add" | "delete";
export type MutableArrayProperties =
  | MutableArrayNewItemsProperties
  | "shift"
  | "reverse"
  | "sort"
  | "pop";

export interface ReadWriteArray<RV, SV>
  extends Pick<Array<RV | SV>, MutableArrayNewItemsProperties>,
    Omit<Array<SV>, MutableArrayNewItemsProperties> {}
export interface ReadWriteMap<K, RV, SV>
  extends Pick<Map<K, RV | SV>, MutableMapNewItemsProperties>,
    Omit<Map<K, SV>, MutableMapNewItemsProperties> {}
export interface ReadWriteSet<RV, SV>
  extends Pick<Set<RV | SV>, MutableSetNewDeleteItemsProperties>,
    Omit<Set<SV>, MutableSetNewDeleteItemsProperties> {}

interface ObservableArrayHelper<RV, SV = ObservableType<RV>>
  extends ReadWriteArray<RV, SV>,
    ProxiedArrayInterface<RV, SV>,
    ProxiedValueInterface<RV[]>,
    ObservableGettersAndSetters<RV[], SV[]> {}

export interface ObservableArray<RV> extends ObservableArrayHelper<RV> {}

// TODO: we dont support common interfaces yet
export interface ObservableMapHelper<K, RV, SV = ObservableType<RV>>
  extends ReadWriteMap<K, RV, SV>,
    ObservableValue<Map<K, SV>, Map<K, SV>> {}
export interface ObservableMap<K, RV> extends ObservableMapHelper<K, RV> {}
export interface ObservableSetHelper<RV, SV = ObservableType<RV>>
  extends ReadWriteSet<RV, SV>,
    ObservableValue<Set<SV>, Set<SV>> {}
export interface ObservableSet<RV> extends ObservableSetHelper<RV> {}

export type ObservableNonNullablePrimitiveType =
  ObservableType<NonNullablePrimitiveType>;
export type NonNullablePrimitiveType = bigint | string | number | boolean;
export type PrimitiveType =
  | NonNullablePrimitiveType
  | ObservableNonNullablePrimitiveType
  | null
  | undefined;

type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
    ? T
    : T extends object
      ? DeepReadonlyObject<T>
      : T;

export interface CommonJSXAttrs<T> {
  attrs: Record<string, any> & {
    children?: SingleJSXElement[] | SingleJSXElement;
  };
  jsxTag: T;
}
export interface FragmentJSXElement extends CommonJSXAttrs<null | undefined> {}
export interface ObjectJSXElement extends CommonJSXAttrs<string> {}
export interface DOMElementJSXElement<E extends Element = Element>
  extends CommonJSXAttrs<E> {}
export interface FunctionJSXElement
  extends CommonJSXAttrs<CreateFCResult<any>> {}
export interface ClassJSXElement
  extends CommonJSXAttrs<
    (new (...args: any[]) => Element) & { tag: string; extends?: string }
  > {}
export type SingleJSXElement =
  | PrimitiveType
  | ObjectJSXElement
  | FunctionJSXElement
  | FragmentJSXElement
  | ClassJSXElement
  | ArrayJSXElement
  | DOMElementJSXElement
  | Node
  | Promise<any>
  | ObservableLike<unknown>;
// | {};
export type ArrayJSXElement = SingleJSXElement[];

export type PickIfExists<T, K extends keyof any> = T extends {
  [L in K]?: unknown;
}
  ? Pick<T, K>
  : {};

type Impossible<K extends keyof any> = {
  [P in K]: never;
};

export type NoExtraProperties<T, U extends T = T> = U &
  Impossible<Exclude<keyof U, keyof T>>;

export type FCProps<T = {}> = {
  [k in keyof T]: k extends "children" ? T[k] : ObservableType<T[k]>;
};

export interface ElementFactoryType<S extends Element = Element> {
  contextElement?: S;
  setProperties(
    el: Element,
    attributes: AnyObject,
    shouldValidateInitialValue?: boolean,
  );
  create<T = Node>(jsx: SingleJSXElement): T;
}
export interface CloneFactoryType<S extends Element = Element>
  extends ElementFactoryType<S> {
  clone<T = Node>(
    template: Node,
    jsx: SingleJSXElement,
    contextElement?: Element,
  ): T;
}

export type CreateFCResult<T = {}, S extends Element = Element> = (
  attrs: FCProps<T>,
  factory: ElementFactoryType<S>,
) => SingleJSXElement;

export type FC<T = {}, S extends Element = Element> = (
  attrs: T,
  factory: ElementFactoryType<S>,
) => SingleJSXElement;
export interface FCC<T = {}, S extends Element = Element>
  extends FC<T & { children?: JSX.Element }, S> {}

export type PropertyKey = string | number | symbol;

export type CSSProperty =
  | CSSObject
  | CSSProperties
  | string
  | number
  | undefined
  | null;
export interface CSSObject {
  [key: string]: ObservableOrConst<CSSProperty>;
}

export type CustomElementTag = `${string}-${string}`;

export type AnyObject = Record<string, any>;

export type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T | null;
};

export type AttributesType = OptionalRecord<string, PrimitiveType | AnyObject>;
// Removed because overcomplicates types on definition of components
// export type ReflectedAttributesType = Record<PropertyKey, Exclude<PrimitiveType, true> | AnyObject>;
export type ReflectedAttributesType = OptionalRecord<
  string,
  PrimitiveType | AnyObject
>;

export type CssVariablesType = CSSObject;
// export type ReflectedCssVariablesType = Record<string, Exclude<PrimitiveType, true>>;
export type ReflectedCssVariablesType = CSSObject;

export type MethodsType = Record<string, Function>;

export type EventsType = Record<string, EventDispatcher<unknown>>;

export type EmptyObject = Record<never, never>;

export type ExtendableElements = keyof HTMLElements;

export type CustomElementEvents<E extends EventsType | undefined> = Readonly<{
  [k in keyof E]: E[k] extends EventDispatcher<infer T>
    ? (detail?: T) => boolean
    : any;
}>;

export interface ExtendsType<T extends ExtendableElements = "div"> {
  /**The tag to extend */
  tag: T;
  /**The class you want to extend */
  class: typeof HTMLElement;
}

export interface MichiElementOptions {
  /**Allows to define attributes.*/
  attributes?: AttributesType;
  /**
   * Allows to define reflected attributes and follows the Kebab case.
   * A reflected attribute cannot be initialized with a true value
   * @link https://developers.google.com/web/fundamentals/web-components/customelements#reflectattr
   */
  reflectedAttributes?: AttributesType;
  /**Methods are functions that notify changes at the time of making the change.*/
  methods?: MethodsType;
  /**Function that renders the component.*/
  render?: Function;
  /**
   * Allows you to define an event to his parent and triggering it easily. It will be defined using Lower case. For example countChanged will be registered as countchanged.
   * @link https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
   */
  events?: EventsType;
  /**
   * Allows you to define a Constructable Stylesheet that depend on the state of the component. When there is no shadow root the style will be reflected in the style attribute.
   */
  computedStyleSheet?: Function;
  // computedStyleSheet?(): CSSObject;
  /**Allows to define CSS variables.*/
  cssVariables?: CssVariablesType;
  /**
   * Allows to define reflected CSS variables and follows the Kebab case.
   * A reflected CSS variable cannot be initialized with a true value
   * @link https://developers.google.com/web/fundamentals/web-components/customelements#reflectattr
   */
  reflectedCssVariables?: ReflectedCssVariablesType;
  /**
   * This tells the browser to treat the element like a form control.
   * @link https://web.dev/more-capable-form-controls/
   */
  formAssociated?: boolean;
  /**
   * Allows to use Constructable Stylesheets.
   * Remember that you need to use Shadow DOM to be able to use Constructable Stylesheets. In case your component doesn't support this feature, it will return a style tag.
   * @link https://developers.google.com/web/updates/2019/02/constructable-stylesheets
   */
  adoptedStyleSheets?: Record<
    string,
    CSSStyleSheet | ((tag: string) => CSSStyleSheet)
  >;
  /**
   * Allows you to add a Shadow DOM. By default, it uses open mode on Autonomous Custom elements and does not use Shadow DOM on Customized built-in elements. Only the following elements are allowed to use Shadow DOM.
   * @link https://dom.spec.whatwg.org/#dom-element-attachshadow
   * @default
   * {mode: 'open'} //on Autonomous Custom elements
   * false //on Customized built-in elements
   */
  shadow?: false | ShadowRootInit;
  /**Contains all lifecycle methods.*/
  lifecycle?: Lifecycle & LifecycleInternals;
  // lifecycle?: Lifecycle<FRA & FRC> &
  // (FOA extends true ? LifecycleInternals : {});

  /**Allows to create a Customized built-in element */
  extends?: ExtendsType<ExtendableElements>;
}

export type ExtendsAttributes<
  O extends ExtendsType<ExtendableElements> | undefined,
> = O extends ExtendsType<infer T> ? HTMLElements[T] : HTMLElements["div"];

export type MichiElementSelf<O extends MichiElementOptions> = {
  [k in keyof O["attributes"]]: ObservableType<O["attributes"][k]>;
} & {
  [k in keyof O["reflectedAttributes"]]: ObservableType<
    O["reflectedAttributes"][k]
  >;
} & { [k in keyof O["cssVariables"]]: ObservableType<O["cssVariables"][k]> } & {
  [k in keyof O["reflectedCssVariables"]]: ObservableType<
    O["reflectedCssVariables"][k]
  >;
} & O["methods"] &
  CustomElementEvents<O["events"]> &
  MichiProperties &
  (O["extends"] extends { class: infer E }
    ? E extends new (
        ...args: any
      ) => any
      ? InstanceType<E>
      : HTMLElement
    : HTMLElement);

export interface CEEvent<T> {
  (ev: CustomEvent<T>): unknown;
}

type MichiElementProps<
  O extends MichiElementOptions,
  S extends HTMLElement = MichiElementSelf<O>,
  Attrs = {
    [k in keyof O["reflectedAttributes"] as KebabCase<k>]?: ObservableOrConstOrPromise<
      GetPrimitiveType<O["reflectedAttributes"][k]> | undefined
    >;
  } & {
    [k in keyof O["reflectedCssVariables"] as KebabCase<k>]?: ObservableOrConstOrPromise<
      GetPrimitiveType<O["reflectedCssVariables"][k]> | undefined
    >;
  } & {
    [k in keyof O["events"] as k extends string
      ? `on${Lowercase<k>}`
      : never]?: O["events"][k] extends EventDispatcher<infer D>
      ? CEEvent<D>
      : never;
  } & { name?: string } & GlobalEvents<S>,
  E = O["attributes"] &
    O["reflectedAttributes"] &
    O["cssVariables"] &
    O["reflectedCssVariables"] &
    O["methods"] &
    CustomElementEvents<O["events"]> &
    MichiProperties,
  _ extends MichiAttributesCustomElement<{}> = MichiAttributesCustomElement<
    E &
      Omit<
        InstanceType<
          O["extends"] extends ExtendsType<infer _T>
            ? O["extends"]["class"]
            : typeof HTMLElement
        >,
        keyof E
      >
  >,
  EA = ExtendsAttributes<O["extends"]>,
> = Omit<EA, keyof Attrs | "_"> & Attrs & _;

export interface MichiElementClass<O extends MichiElementOptions> {
  new (props?: MichiElementProps<O>): MichiElementSelf<O>;
  readonly tag: string;
  readonly extends?: string;
  readonly observedAttributes: Readonly<string[]>;
  readonly elementOptions: O;
  readonly cssSelector: string;
  readonly internalCssSelector: string;
  formAssociated: boolean;
}
export interface Lifecycle {
  /**This method is called at the start of constructor.*/
  willConstruct?(): void;
  /**This method is called when the element is adopted by another document.*/
  adopted?(document: Document, newDocument: Document): void;
  /**This method is called at the end of constructor.*/
  didConstruct?(): void;
  /**This method is called when a component is connected to the DOM.*/
  connected?(): void;
  /**This method is called when a component is disconnected from the DOM.*/
  disconnected?(): void;
  /**This method is called right before a component mounts.*/
  willMount?(): void;
  /**This method is called after the component has mounted. */
  didMount?(): void;
  /**This method is called after a component is removed from the DOM. */
  didUnmount?(): void;
  /**This method is called before a component does anything with an attribute. */
  willReceiveAttributeCallback?(
    name: string,
    newValue: unknown,
    oldValue: unknown,
  ): void;
}

type FormStateRestoreCallbackMode = "restore" | "autocomplete";

export interface LifecycleInternals {
  /**Called when the browser associates the element with a form element, or disassociates the element from a form element. */
  formAssociatedCallback?(form: HTMLFormElement): void;
  /**Called after the disabled state of the element changes, either because the disabled attribute of this element was added or removed;
   * or because the disabled state changed on a `<fieldset>` that's an ancestor of this element. The disabled parameter represents the new
   * disabled state of the element. The element may, for example, disable elements in its shadow DOM when it is disabled. */
  formDisabledCallback?(disabled: boolean): void;
  /**
   * Called after the form is reset. The element should reset itself to some kind of default state.
   * For `<input>` elements, this usually involves setting the value property to match the value attribute set in markup (or in the case of a checkbox,
   * setting the checked property to match the checked attribute.
   */
  formResetCallback?(): void;
  /**
   * Called in one of two circumstances:
   * * When the browser restores the state of the element (for example, after a navigation, or when the browser restarts). The mode argument is "restore" in this case.
   * * When the browser's input-assist features such as form autofilling sets a value. The mode argument is "autocomplete" in this case.
   *
   * The type of the first argument depends on how the setFormValue() method was called.
   */
  formStateRestoreCallback?(
    state: string,
    mode: FormStateRestoreCallbackMode,
  ): void;
}

export interface ElementFactory {
  compare(el: Node, jsx: JSX.Element): boolean;
  create(
    jsx: JSX.Element,
    isSVG?: boolean,
    isMATHML?: boolean,
    self?: Element,
  ): ChildNode | ParentNode;
}

export type GetElementProps<El> = El extends (...args: infer Y) => any
  ? Y[0]
  : El extends {
        new (...args: infer T): any;
      }
    ? T[0]
    : El extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[El]
      : {};

export type UseStyleSheetCallback<T> = (
  tags: string,
  cssVariables: CssVariablesObject<T>,
) => CSSObject;

export interface UseStyleSheet {
  <T>(
    props: UseStyleSheetCallback<T>,
    $window?: Window & typeof globalThis,
  ): (tag: string) => CSSStyleSheet;
  (props: CSSObject, $window?: Window & typeof globalThis): CSSStyleSheet;
}

/**
 * Represents transition properties for CSS animations.
 */
interface Transition {
  /**
   * The CSS properties to apply the transition to.
   */
  property: string[];
  /**
   * The duration of the transition.
   */
  duration?: string;
  /**
   * The timing function for the transition.
   */
  timingFunction?: string;
  /**
   * The delay before the transition starts.
   */
  delay?: string;
}

export interface UseTransition {
  (props: Transition): CSSObject;
}

/**
 * Represents keyframes for CSS animations.
 */
type TransitionKeyframes =
  | ({
      [k in keyof Omit<CSSProperties, "offset">]?: CSSProperties[k][];
    } & { offset?: number[] })
  | (Omit<CSSProperties, "offset"> & { offset?: number })[];

export interface UseAnimation {
  (
    keyframes: TransitionKeyframes,
    options: Pick<
      KeyframeAnimationOptions,
      "id" | "delay" | "direction" | "duration" | "easing" | "fill"
    > & {
      iterations?: "infinite" | number;
    },
  ): [CSSObject, CSSObject];
}

export interface CookieStorageConstructor
  extends Omit<CookieInit, "name" | "value"> {}

declare global {
  interface Window {
    msCrypto?: Crypto;

    URLPattern?: {
      new (
        url: Partial<URL> & { baseURL?: string },
      ): {
        test(url: string): boolean;
      };
    };
  }
}
