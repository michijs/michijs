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
export type ExtendableComponentWithoutChildren<T> = ExtendableComponent<T> & {
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
    // TODO: find why it is failing
    [k in WritableKeys<E>]?: Omit<
      ObservableOrConst<Unproxify<E[k]> | undefined>,
      "valueOf"
    >;
  };
}

export type KebabCase<Value> = DelimiterCase<Value, "-">;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

// End Auxiliar Types
export type Subscription<T> = (signal: T) => void;
export type RefSubscription<T, E> = (signal: T, el: E) => void;
export interface CompatibleSubscription {
  // its optional to keep compatibility with others observers like redux
  (): void;
}

export type ObservableTypeOrConst<T> = ObservableType<T> | T;
export type ObservableOrConst<T> = ObservableLike<T> | T;
export type CreateFunctionalComponentProps<T> = {
  [k in keyof T]: k extends "children" ? T[k] : ObservableOrConst<T[k]>;
};
export type CreateFunctionalComponent<T> = (
  props: CreateFunctionalComponentProps<T>,
) => SingleJSXElement;
export interface ObservableLike<T> {
  subscribe(observer: Subscription<T>): void;
  unsubscribe(observer: Subscription<T>): void;
}
export interface CompatibleObservableLike {
  subscribe(observer: CompatibleSubscription): void;
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
    shadowRoot?: ShadowRoot;
    styles: {
      className?: string;
      cssVariables?: CSSStyleSheet;
      computedStyleSheet?: CSSStyleSheet;
    };
    idGen?: MappedIdGenerator["getId"];
    internals?: ElementInternals;
  };
  render?(): JSX.Element;
  /**Allows to get a child element from the host with the selector */
  child<T = HTMLElement>(selector: string): (T extends new (props: any) => infer Y ? Y : T) | undefined;
  /**Create unique IDs with a discernible key */
  readonly idGen: MappedIdGenerator["getId"];
  readonly name: string | null;
  readonly type: string;
}

export interface MichiCustomElement extends HTMLElement, MichiProperties {}

export interface ProxiedArrayInterface<RV, SV = ObservableType<RV>>
  extends ProxiedValueInterface<RV[], SV[]> {
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
    props: ExtendableComponentWithoutChildren<E> & {
      renderItem: FC<SV>;
    },
    context?: CreateOptions,
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

export interface ProxiedValueInterface<RV, SV> extends ObservableLike<RV> {
  get $value(): SV;
  set $value(newValue: SV | RV);
  notifyCurrentValue(): void;
  toObservableString(): ObservableType<string>;
  toBoolean(): boolean;
  toString(): string;
  not(): boolean;
  shouldNotify(): boolean;
  is(anotherValue: unknown): boolean;
  typeof(): Typeof;
  unproxify(): RV;
  valueOf(): RV;
}

interface ObservableGettersAndSetters<RV, SV> {
  (newValue: SV | RV): void;
  (): RV;
}

export interface ObservableValue<RV, SV = RV>
  extends ProxiedValueInterface<RV, SV>,
    ObservableGettersAndSetters<RV, SV> {}

export interface PrimitiveObservableValue<RV> extends ObservableValue<RV, RV> {}

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
  canGoBack(fallbackUrl?: ObservableOrConst<string | URL>): boolean;
  back(fallbackUrl?: ObservableOrConst<string | URL>): void;
  replaceCurrentUrl(url: ObservableOrConst<string | URL>): void;
  push(url: ObservableOrConst<string | URL>): void;
  matches(url: ObservableOrConst<string>, flexible?: boolean): boolean;
}

export interface DoFetchProps<
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
> extends RequestInitUseFetch<
    B extends AnyObject ? { [k in keyof B]: ObservableOrConst<B[k]> } : B
  > {
  input: string;
  searchParams?: { [k in keyof S]: ObservableOrConst<S[k]> };
}

export type usePromiseShouldWait = ObservableTypeOrConst<Promise<any>>[];

export type UseFetchCallback<
  S extends SearchParams = undefined,
  B extends AnyObject | undefined | string = undefined,
> = () => DoFetchProps<S, B> | Promise<DoFetchProps<S, B>>;

export interface UseFetchOptions<T> {
  transform?(value: T): T;
}
export interface UseComputedObserveOptions {
  onBeforeUpdate?(): void;
  onAfterUpdate?(): void;
}

export type useWatchDeps = any[];

/**
 * Interface representing the result of a fetch operation.
 * @template R Type of the expected response data.
 */
export interface FetchResult<R> extends PromiseResult<R> {}
export interface PromiseResult<R> {
  /**
   * The promise
   */
  promise: ObservableType<Promise<R>>;
  /**
   * Call again the promise. Available after first call
   */
  recall(): void;
}

// Needs to be partial to allow asignation operation
export type ObservableType<Y, T = NonNullable<Y>> = IsAny<T> extends true
  ? any
  : // Intentional - otherwise it doesnt work
    [Y] extends [ObservableLike<any>]
    ? Y
    : [T] extends [Array<infer V>]
      ? ObservableArray<V>
      : [T] extends [Promise<infer V>]
        ? ObservableComplexObject<Promise<V>>
        : [T] extends [Function]
          ? Y
          : [T] extends [Map<infer K, infer V>]
            ? ObservableMap<K, V>
            : [T] extends [Set<infer V>]
              ? ObservableSet<V>
              : [T] extends [Date]
                ? PrimitiveObservableValue<Y> & Date
                : [T] extends [object]
                  ? // ? ExtendsObject<T> extends true
                    ObservableObject<Y>
                  : // : ObservableComplexObject<Y>
                    PrimitiveObservableValue<GetPrimitiveType<Y>> &
                      GetPrimitiveTypeClass<T>;

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
> = PrimitiveObservableValue<RV>;

export type ObservableObject<
  RV,
  SV = {
    [K in keyof RV]-?: ObservableType<RV[K]>;
  },
> = SV & ObservableValue<RV, SV>;

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
export interface DOMElementJSXElement extends CommonJSXAttrs<ParentNode> {}
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

export type CreateFCResult<
  T = {},
  S extends Element = Element,
  C = CreateOptions<S>,
> = (attrs: FCProps<T>, context?: C) => SingleJSXElement;

export type FC<T = {}, S extends Element = Element, C = CreateOptions<S>> = (
  attrs: T,
  context?: C,
) => SingleJSXElement;
export interface FCC<T = {}, S extends Element = Element, C = CreateOptions<S>>
  extends FC<T & { children?: JSX.Element }, S, C> {}

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
  [P in K]?: T;
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

export type MichiElementSelf<O extends MichiElementOptions> = ObservableType<
  O["attributes"] &
    O["reflectedAttributes"] &
    O["cssVariables"] &
    O["reflectedCssVariables"]
> &
  O["methods"] &
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
    [k in keyof O["reflectedAttributes"] as KebabCase<k>]?: ObservableOrConst<
      GetPrimitiveType<O["reflectedAttributes"][k]> | undefined
    >;
  } & {
    [k in keyof O["reflectedCssVariables"] as KebabCase<k>]?: ObservableOrConst<
      GetPrimitiveType<O["reflectedCssVariables"][k]> | undefined
    >;
  } & {
    [k in keyof O["events"] as k extends string
      ? `on${Lowercase<k>}`
      : never]?: O["events"][k] extends EventDispatcher<infer D>
      ? CEEvent<D>
      : never;
  } & { name?: string } & GlobalEvents<S>,
> = MichiAttributes<S> &
  Omit<ExtendsAttributes<O["extends"]>, keyof Attrs> &
  Attrs;

export interface MichiElementClass<O extends MichiElementOptions> {
  new (props: MichiElementProps<O>): MichiElementSelf<O>;
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
  /**This method is called at the end of constructor.*/
  didConstruct?(): void;
  /**This method is called when a component is connected to the DOM.*/
  connected?(): void;
  /**This method is called right before a component mounts.*/
  willMount?(): void;
  /**This method is called after the component has mounted. */
  didMount?(): void;
  /**This method is called after a component is removed from the DOM. */
  didUnmount?(): void;
  /**This method is called before a component does anything with an attribute. */
  willReceiveAttribute?(
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

export type GetElementProps<El> = El extends {
  new (arg: infer T): any;
}
  ? T
  : El extends (...args: any) => any
    ? Parameters<El>[0]
    : El extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[El]
      : never;

export interface CreateOptions<E extends Element = Element> {
  readonly isSVG?: boolean;
  readonly isMATHML?: boolean;
  readonly contextElement?: E;
}

export type UseStyleSheetCallback<T> = (
  tags: string,
  cssVariables: CssVariablesObject<T>,
) => CSSObject;

export interface UseStyleSheet {
  <T>(props: UseStyleSheetCallback<T>): (tag: string) => CSSStyleSheet;
  (props: CSSObject): CSSStyleSheet;
}

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
