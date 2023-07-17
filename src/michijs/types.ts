import type {
  HTMLElements,
  CSSProperties,
  GlobalEvents,
} from "@michijs/htmltype";
import { EventDispatcher } from "./classes";
import { idGenerator } from "./hooks";
import { Fragment } from "./components";
import { MichiAttributes } from "./h/MichiAttributes";
import { ProxiedValue } from "./hooks/observe/ProxiedValue";

export type StringKeyOf<T extends object> = Extract<keyof T, string>;
export type CSSVar<T extends string> = KebabCase<T> & {
  var<V extends undefined | string | number = undefined>(
    defaultValue?: V,
  ): `var(${KebabCase<T>}${V extends undefined ? "" : `,${V}`})`;
};
export type CssDeclaration<
  T extends object | unknown,
  PK extends string = "-",
> = T extends object
  ? {
    [k in StringKeyOf<T>]: CssDeclaration<T[k], `${PK}-${k}`>;
  }
  : CSSVar<PK>;
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
type NonUndefined<A> = A extends undefined ? never : A;
export type NonFunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? never : K;
}[keyof T];
export type PickWritable<E> = Pick<E, WritableKeys<E>>;
export type PickNonFunction<E extends object> = Pick<E, NonFunctionKeys<E>>;

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

export type KebabCase<Value> = DelimiterCase<Value, "-">;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

// End Auxiliar Types
export interface ObserverCallback<T> {
  (value?: T): void;
}

export interface ObservableLike<T = any> {
  subscribe(observer: ObserverCallback<T>): void;
  unsubscribe?(observer: ObserverCallback<T>): void;
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
    store: Store<AnyObject, AnyObject>;
    cssStore: Store<AnyObject, EmptyObject>;
    alreadyRendered: boolean;
    shadowRoot?: ShadowRoot;
    styles: HTMLStyleElement[];
    pendingTasks: number;
    idGen?: ReturnType<typeof idGenerator>["getId"];
    internals?: ElementInternals;
    fakeRoot?: HTMLElement;
  };
  render?(): JSX.Element;
  /**Allows to get a child element from the host with the selector */
  child<T extends (new () => HTMLElement) | HTMLElement = HTMLElement>(
    selector: string,
  ): T extends new () => HTMLElement ? InstanceType<T> : T;
  /**Create unique IDs with a discernible key */
  readonly idGen: ReturnType<typeof idGenerator>["getId"];
  readonly name: string | null;
  readonly type: string;
}

export interface MichiCustomElement extends HTMLElement, MichiProperties { }

export type ObservableValue<T> = T & Partial<ProxiedValue<T>>;

export type Observable<T> = (T extends Map<infer K, infer V> ? Map<K, Observable<V>> : T extends object
  ? {
    [K in keyof T]: T[K] extends Function ? T[K] : Observable<T[K]>;
  }
  : T extends undefined ? unknown : T) &
  Partial<ProxiedValue<T>>;

export type NonNullablePrimitiveType =
  | bigint
  | string
  | number
  | boolean
  | Observable<bigint | string | number | boolean>;
export type PrimitiveType = NonNullablePrimitiveType | null | undefined;

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

export type Key = number | string;

export interface IterableAttrs<T> {
  /**When iterating nodes its higly recomended to use keys */
  key?: Key;
  tag: T;
}

export interface CommonJSXAttrs<T> extends IterableAttrs<T> {
  attrs: Record<string, any> & { children: JSX.Element[] };
}
export type FragmentJSXElement = CommonJSXAttrs<
  typeof Fragment.tag | undefined
>;
export type IterableJSX = {
  key: number | string;
} & CommonJSXAttrs<Element>;
export type ObjectJSXElement = CommonJSXAttrs<string>;
export type DOMElementJSXElement = CommonJSXAttrs<Element>;
export type FunctionJSXElement = CommonJSXAttrs<FC<any>>;
export type ClassJSXElement = CommonJSXAttrs<
  (new (...args: any[]) => Element) & { tag: string; extends?: string }
>;
export type SingleJSXElement =
  | PrimitiveType
  | ObjectJSXElement
  | FunctionJSXElement
  | FragmentJSXElement
  | ClassJSXElement
  | ArrayJSXElement
  | DOMElementJSXElement;
export type ArrayJSXElement = SingleJSXElement[];
// export type PureObjectJSXElement = { tag: string } & Omit<CommonJSXAttrs,'children'> & {children: (PureObjectJSXElement | string)[]};

export interface FC<T = {}, S = Element> {
  (attrs: T, self?: S | null): Node;
}

export type PropertyKey = string | number | symbol;
export interface ChangeFunction {
  (propertyPath?: string): void;
}
export interface ValidatePropertyChangeFunction {
  (propertyPath?: string): boolean;
}

export type CSSProperty =
  | CSSObject
  | CSSProperties
  | string
  | number
  | undefined
  | null;
export interface CSSObject {
  [key: string]: CSSProperty;
}

export type CustomElementTag = `${string}-${string}`;

export type AnyObject = Record<string, any>;

export type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

// I need to use object to avoid infinite loop in KeysAndKeysOf
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

export interface StoreProps<T, Y> {
  /**Allows to define the store state. */
  state: T;
  /**Transactions are functions that notify changes at the end of the transaction. */
  transactions?: Y;
}

export type ExtendableElements = keyof HTMLElements;

export type CustomElementEvents<E extends EventsType | undefined> = Readonly<{
  [k in keyof E]: E[k] extends EventDispatcher<infer T>
  ? (detail?: T) => boolean
  : any;
}>;

export interface ExtendsObject<T extends ExtendableElements = "div"> {
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
  /**Transactions are functions that notify changes at the end of the transaction.*/
  transactions?: MethodsType;
  /**Methods are functions that notify changes at the time of making the change.*/
  methods?: MethodsType;
  /**Function that renders the component.*/
  render?: Function;
  /**
   * Allows you to define an event to his parent and triggering it easily. It will be defined using Lower case. For example countChanged will be registered as countchanged.
   * @link https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
   */
  events?: EventsType;
  /**Allows to define non observed attributes. This is useful for complex objects that cannot be observed.*/
  nonObservedAttributes?: Function;
  // nonObservedAttributes?(): AttributesType;
  /**
   * Allows you to define a Constructable Stylesheet that depend on the state of the component. When there is no shadow root the style will be reflected in the style attribute.
   */
  computedStyleSheet?: Function;
  // computedStyleSheet?(): CSSObject;

  // nonObservedAttributes?(): AttributesType;
  /**Allows to define CSS variables. CSS variables changes does not trigger a rerender*/
  cssVariables?: CssVariablesType;
  /**
   * Allows to define reflected CSS variables and follows the Kebab case. CSS variables changes does not trigger a rerender
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
  adoptedStyleSheets?: CSSStyleSheet[];
  /** Allows to create a fake root on the element. This is especially useful to emulate a shadow root if you don't have shadow root. Since it allows you to add children from a parent node
   * @default
   * false //if you have shadow root.
   * true //if you do not
   */
  fakeRoot?: boolean;
  /**
   * Allows you to add a Shadow DOM. By default, it uses open mode on Autonomous Custom elements and does not use Shadow DOM on Customized built-in elements. Only the following elements are allowed to use Shadow DOM.
   * @link https://dom.spec.whatwg.org/#dom-element-attachshadow
   * @default
   * {mode: 'open'} //on Autonomous Custom elements
   * false //on Customized built-in elements
   */
  shadow?: false | ShadowRootInit;
  // observe?: {
  //   [k in KeysAndKeysOf<RA>]?: () => void;
  // } & {
  //   [k in KeysAndKeysOf<A>]?: () => void;
  // } & {
  //   [k in KeysAndKeysOf<C>]?: () => void;
  // } & {
  //   [k in KeysAndKeysOf<RC>]?: () => void;
  // } & (S extends EmptyObject ? { [k in keyof S]?: () => void } : EmptyObject);

  /**Contains all lifecycle methods.*/
  lifecycle?: Lifecycle & LifecycleInternals;
  // lifecycle?: Lifecycle<FRA & FRC> &
  // (FOA extends true ? LifecycleInternals : {});

  /**Allows to create a Customized built-in element */
  extends?: ExtendsObject<ExtendableElements>;
}

export type ExtendsAttributes<
  O extends ExtendsObject<ExtendableElements> | undefined,
> = O extends ExtendsObject<infer T> ? HTMLElements[T] : HTMLElements["div"];

export type MichiElementSelf<O extends MichiElementOptions> = O["attributes"] &
  O["reflectedAttributes"] &
  O["cssVariables"] &
  O["reflectedCssVariables"] &
  O["transactions"] &
  O["methods"] &
  (O["nonObservedAttributes"] extends () => infer NOA ? NOA : {}) &
  CustomElementEvents<O["events"]> &
  MichiProperties &
  (O["extends"] extends { class: infer E }
    ? E extends new (
      ...args: any
    ) => any
    ? InstanceType<E>
    : HTMLElement
    : HTMLElement);

type MichiElementProps<
  O extends MichiElementOptions,
  S extends HTMLElement,
  Attrs = {
    [k in
    keyof O["reflectedAttributes"]as KebabCase<k>]: O["reflectedAttributes"][k];
  } & {
    [k in
    keyof O["reflectedCssVariables"]as KebabCase<k>]: O["reflectedCssVariables"][k];
  } & {
    [k in
    keyof O["events"]as k extends string
    ? `on${Lowercase<k>}`
    : never]?: O["events"][k] extends EventDispatcher<infer D>
    ? (ev: CustomEvent<D>) => unknown
    : never;
  } & { name: string } & GlobalEvents<S>,
> = MichiAttributes<S> &
  Omit<ExtendsAttributes<O["extends"]>, keyof Attrs> &
  Partial<Attrs>;

export type MichiElementClass<
  O extends MichiElementOptions,
  S extends HTMLElement,
> = {
  new(props: MichiElementProps<O, S>): S;
  readonly tag: string;
  readonly extends?: string;
  readonly observedAttributes: Readonly<string[]>;
  formAssociated: boolean;
};
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
  // willReceiveAttribute?<WRAN extends keyof FRA>(
  //   name: WRAN,
  //   newValue: FRA[WRAN],
  //   oldValue: FRA[WRAN],
  // ): void;
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

export interface Store<
  T extends object = EmptyObject,
  Y extends Record<string | symbol, Function> = EmptyObject,
> extends ObservableLike<string[]> {
  state: T;
  transactions: Y;
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

export interface CreateCustomElementStaticResult<
  FRC extends Object,
  FRA extends Object,
  FOA extends boolean,
  TA extends CustomElementTag,
  EXTA extends ExtendableElements,
> {
  readonly tag: TA;
  readonly extends?: EXTA;
  readonly observedAttributes: Readonly<Array<keyof FRA & keyof FRC>>;
  formAssociated: FOA;
}

export type GetElementProps<El extends any> = El extends {
  new(arg: infer T): any;
}
  ? T
  : El extends (...args: any) => any
  ? Parameters<El>[0]
  : El extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[El]
  : never;

export type EventListenerMap = Map<string, EventListener>;

declare global {
  interface Element {
    /**
     * Children are not created or updated. Element creation/update is delegated
     */
    $doNotTouchChildren?: boolean;
  }

  interface ChildNode {
    /**
     * An identifier of an item within a list
     */
    $key?: string | number;
    /**
     * Tells the custom element that this element should be completely ignored on render
     * Cannot be used on lists
     */
    $ignore?: boolean;
  }

  interface Window {
    msCrypto?: Crypto;
  }
}
