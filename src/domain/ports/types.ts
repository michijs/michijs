


export interface RequestInitUseFetch<B> extends Omit<RequestInit, "body"> {
  body?: B;
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


export interface CommonJSXAttrs<T> {
  attrs: Record<string, any> & {
    children?: SingleJSXElement[] | SingleJSXElement;
  };
  jsxTag: T;
}
export interface FragmentJSXElement extends CommonJSXAttrs<null | undefined> { }
export interface ObjectJSXElement extends CommonJSXAttrs<string> { }
export interface DOMElementJSXElement<E extends Element = Element>
  extends CommonJSXAttrs<E> { }
export interface FunctionJSXElement
  extends CommonJSXAttrs<CreateFCResult<any>> { }
export interface ClassJSXElement
  extends CommonJSXAttrs<
    (new (...args: any[]) => Element) & { tag: string; extends?: string }
  > { }
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
  extends FC<T & { children?: JSX.Element }, S> { }

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
    [k in keyof O["reflectedAttributes"]as KebabCase<k>]?: ObservableOrConstOrPromise<
      GetPrimitiveType<O["reflectedAttributes"][k]> | undefined
    >;
  } & {
    [k in keyof O["reflectedCssVariables"]as KebabCase<k>]?: ObservableOrConstOrPromise<
      GetPrimitiveType<O["reflectedCssVariables"][k]> | undefined
    >;
  } & {
    [k in keyof O["events"]as k extends string
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
  new(props: MichiElementProps<O>): MichiElementSelf<O>;
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
