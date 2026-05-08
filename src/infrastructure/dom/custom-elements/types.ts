import type { EventDispatcher } from "../../platform/entities/EventDispatcher";
import type {
  HTMLElements,
  GlobalEvents,
} from "../jsx-runtime/generated/htmlType";
import type { CSSObject } from "../styles/types";
import type {
  ObservableProxyPort,
  ObservableProxiedComplexObjectPort,
  ObservableOrConstOrPromise,
  ObservablePort,
} from "#ports";
import type { MappedIdGenerator } from "#domain";
import type {
  AnyObject,
  GetPrimitiveType,
  KebabCase,
  PrimitiveType,
  WritableKeys,
} from "#shared";

export interface MichiAttributes<E> {
  children?: JSX.Element;
  _?: {
    [k in WritableKeys<E>]?: ObservablePort<E[k] | undefined | null>;
  };
}
export interface MichiAttributesCustomElement<E> {
  children?: JSX.Element;
  _?: {
    [k in WritableKeys<E>]?: E[k] extends ObservableProxiedComplexObjectPort<
      infer U
    >
      ? ObservablePort<U | undefined | null> | U | undefined | null
      :
          | ObservableOrConstOrPromise<GetPrimitiveType<E[k]> | undefined | null>
          | undefined
          | null;
  };
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
  willReceiveAttribute?(
    name: string,
    newValue: unknown,
    oldValue: unknown,
  ): void;
}

type FormStateRestoreCallbackMode = "restore" | "autocomplete";

export interface LifecycleInternals {
  /**Called when the browser associates the element with a form element, or disassociates the element from a form element. */
  formAssociated?(form: HTMLFormElement): void;
  /**Called after the disabled state of the element changes, either because the disabled attribute of this element was added or removed;
   * or because the disabled state changed on a `<fieldset>` that's an ancestor of this element. The disabled parameter represents the new
   * disabled state of the element. The element may, for example, disable elements in its shadow DOM when it is disabled. */
  formDisabled?(disabled: boolean): void;
  /**
   * Called after the form is reset. The element should reset itself to some kind of default state.
   * For `<input>` elements, this usually involves setting the value property to match the value attribute set in markup (or in the case of a checkbox,
   * setting the checked property to match the checked attribute.
   */
  formReset?(): void;
  /**
   * Called in one of two circumstances:
   * * When the browser restores the state of the element (for example, after a navigation, or when the browser restarts). The mode argument is "restore" in this case.
   * * When the browser's input-assist features such as form autofilling sets a value. The mode argument is "autocomplete" in this case.
   *
   * The type of the first argument depends on how the setFormValue() method was called.
   */
  formStateRestore?(state: string, mode: FormStateRestoreCallbackMode): void;
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
    store: ObservableProxyPort<AttributesType>;
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

export type CustomElementTag = `${string}-${string}`;

export type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T | null;
};

export type AttributesType = OptionalRecord<string, PrimitiveType | AnyObject>;

export type ReflectedAttributesType = OptionalRecord<
  string,
  PrimitiveType | AnyObject
>;

export type CssVariablesType = CSSObject;

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

  /**Allows to create a Customized built-in element */
  extends?: ExtendsType<ExtendableElements>;
}

export type ExtendsAttributes<
  O extends ExtendsType<ExtendableElements> | undefined,
> = O extends ExtendsType<infer T> ? HTMLElements[T] : HTMLElements["div"];

export type MichiElementSelf<O extends MichiElementOptions> = {
  [k in keyof O["attributes"]]: ObservableProxyPort<O["attributes"][k]>;
} & {
  [k in keyof O["reflectedAttributes"]]: ObservableProxyPort<
    O["reflectedAttributes"][k]
  >;
} & {
  [k in keyof O["cssVariables"]]: ObservableProxyPort<O["cssVariables"][k]>;
} & {
  [k in keyof O["reflectedCssVariables"]]: ObservableProxyPort<
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

type Impossible<K extends keyof any> = {
  [P in K]: never;
};

export type NoExtraProperties<T, U extends T = T> = U &
  Impossible<Exclude<keyof U, keyof T>>;

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
  new (props: MichiElementProps<O>): MichiElementSelf<O>;
  readonly tag: string;
  readonly extends?: string;
  readonly observedAttributes: Readonly<string[]>;
  readonly elementOptions: O;
  readonly cssSelector: string;
  readonly internalCssSelector: string;
  formAssociated: boolean;
}
