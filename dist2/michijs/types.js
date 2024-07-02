/**
 * @typedef {import('./generated/htmlType').HTMLElements}
 * @typedef {import('./generated/htmlType').CSSProperties}
 * @typedef {import('./generated/htmlType').GlobalEvents}
 */
export { }

/**
 * @typedef {import('./classes').EventDispatcher} EventDispatcher
 * @typedef {import('./classes').MappedIdGenerator} MappedIdGenerator
 */

/**
 * @typedef {import('./routing').SearchParams} SearchParams
 */

/**

 * @template E

 * @typedef {object} MichiAttributes

 * @property {JSX.Element} [children]

 * @property {{ [k in WritableKeys<E>]?: Omit< ObservableOrConst<Unproxify<E[k]> | undefined>, "valueOf" >; }} [_]

 */

/**

 * @typedef {object} CompatibleSubscription

 */

/**

 * @template T

 * @typedef {object} ObservableLike

 * @property {(observer: Subscription<T>) => void} subscribe

 * @property {(observer: Subscription<T>) => void} unsubscribe

 */

/**

 * @typedef {object} CompatibleObservableLike

 * @property {(observer: CompatibleSubscription) => void} subscribe

 */

/**

 * @typedef {object} MichiProperties

 * @property {object} $michi

 * @property {ObservableType<AttributesType>} $michi.store

 * @property {boolean} $michi.alreadyRendered

 * @property {ShadowRoot} [$michi.shadowRoot]

 * @property {object} $michi.styles

 * @property {string} [$michi.styles.className]

 * @property {CSSStyleSheet} [$michi.styles.cssVariables]

 * @property {CSSStyleSheet} [$michi.styles.computedStyleSheet]

 * @property {MappedIdGenerator["getId"]} [$michi.idGen]

 * @property {ElementInternals} [$michi.internals]

 * @property {MappedIdGenerator["getId"]} idGen Create unique IDs with a discernible key

 * @property {string | null} name

 * @property {string} type

 * @property {() => JSX.Element} [render]

 * @property {(selector: string) => T extends new () => HTMLElement ? InstanceType<T> : T} child Allows to get a child element from the host with the selector

 */

/**

 * @typedef {object} MichiCustomElement

 */

/**

 * @template RV

 * @template [SV = ObservableType<RV>]

 * @typedef {object} ProxiedArrayInterface

 * @property {() => void} $clear Removes all the list elements

 * @property {(...items: (SV | RV)[]) => number} $replace Replace all the list elements

 * @property {(index: number) => void} $remove Removes an item

 * @property {(indexA: number, indexB: number) => void} $swap Swaps two items

 * @property {(props: ExtendableComponentWithoutChildren<E> & {

 *       renderItem: FC<SV>;

 *     }, context?: CreateOptions) => Node} List Is a proxy that allows you to avoid using dom diff algorithms to render lists.

 * This allows it to have a performance close to vanilla js.

 * An operation on the data implies an operation on the associated elements.

 */

/**

 * @template RV

 * @template SV

 * @typedef {object} ProxiedValueInterface

 * @property {() => void} notifyCurrentValue

 * @property {() => PrimitiveObservableValue<string> & String} toObservableString

 * @property {() => boolean} toBoolean

 * @property {() => string} toString

 * @property {() => boolean} not

 * @property {() => boolean} shouldNotify

 * @property {(anotherValue: unknown) => boolean} is

 * @property {() => Typeof} typeof

 * @property {() => RV} unproxify

 * @property {() => RV} valueOf

 */

/**

 * @template RV

 * @template SV

 * @typedef {object} ObservableGettersAndSetters

 */

/**

 * @template RV

 * @template [SV = RV]

 * @typedef {object} ObservableValue

 */

/**

 * @template RV

 * @typedef {object} PrimitiveObservableValue

 */

/**

 * @template B

 * @typedef {object} RequestInitUseFetch

 * @property {B} [body]

 */

/**

 * @template {SearchParams} [S = undefined]

 * @template {AnyObject | undefined | string} [B = undefined]

 * @typedef {object} DoFetchProps

 * @property {string} input

 * @property {{ [k in keyof S]: ObservableOrConst<S[k]> }} [searchParams]

 */

/**

 * @template T

 * @typedef {object} UseFetchOptions

 * @property {(value: T) => T} [transform]

 */

/**

 * @typedef {object} UseComputedObserveOptions

 * @property {() => void} [onBeforeUpdate]

 * @property {() => void} [onAfterUpdate]

 */

/**
 * Interface representing the result of a fetch operation.
 * @template R Type of the expected response data.

 * @template R

 * @typedef {object} FetchResult

 */

/**

 * @template R

 * @typedef {object} PromiseResult

 * @property {ObservableType<Promise<R>>} promise The promise

 * @property {() => void} [recall] Call again the promise. Available after first call

 */

/**

 * @template RV

 * @template SV

 * @typedef {object} ReadWriteArray

 */

/**

 * @template K

 * @template RV

 * @template SV

 * @typedef {object} ReadWriteMap

 */

/**

 * @template RV

 * @template SV

 * @typedef {object} ReadWriteSet

 */

/**

 * @template RV

 * @template [SV = ObservableType<RV>]

 * @typedef {object} ObservableArrayHelper

 */

/**

 * @template RV

 * @typedef {object} ObservableArray

 */

/**

 * @template K

 * @template RV

 * @template [SV = ObservableType<RV>]

 * @typedef {object} ObservableMapHelper

 */

/**

 * @template K

 * @template RV

 * @typedef {object} ObservableMap

 */

/**

 * @template RV

 * @template [SV = ObservableType<RV>]

 * @typedef {object} ObservableSetHelper

 */

/**

 * @template RV

 * @typedef {object} ObservableSet

 */

/**

 * @template T

 * @typedef {object} CommonJSXAttrs

 * @property {Record<string, any> & { children?: SingleJSXElement[] | SingleJSXElement; }} attrs

 * @property {T} jsxTag

 */

/**

 * @typedef {object} FragmentJSXElement

 */

/**

 * @typedef {object} ObjectJSXElement

 */

/**

 * @typedef {object} DOMElementJSXElement

 */

/**

 * @typedef {object} FunctionJSXElement

 */

/**

 * @typedef {object} ClassJSXElement

 */

/**

 * @template [T = {}]

 * @template {Element} [S = Element]

 * @template [C = CreateOptions<S>]

 * @typedef {object} FCC

 */

/**

 * @typedef {object} CSSObject

 */

/**

 * @template {ExtendableElements} [T = "div"]

 * @typedef {object} ExtendsType

 * @property {T} tag The tag to extend

 * @property {typeof HTMLElement} class The class you want to extend

 */

/**

 * @typedef {object} MichiElementOptions

 * @property {AttributesType} [attributes] Allows to define attributes.

 * @property {AttributesType} [reflectedAttributes] Allows to define reflected attributes and follows the Kebab case.

 * A reflected attribute cannot be initialized with a true value

 * @property {MethodsType} [methods] Methods are functions that notify changes at the time of making the change.

 * @property {Function} [render] Function that renders the component.

 * @property {EventsType} [events] Allows you to define an event to his parent and triggering it easily. It will be defined using Lower case. For example countChanged will be registered as countchanged.

 * @property {Function} [computedStyleSheet] Allows you to define a Constructable Stylesheet that depend on the state of the component. When there is no shadow root the style will be reflected in the style attribute.

 * @property {CssVariablesType} [cssVariables] Allows to define CSS variables.

 * @property {ReflectedCssVariablesType} [reflectedCssVariables] Allows to define reflected CSS variables and follows the Kebab case.

 * A reflected CSS variable cannot be initialized with a true value

 * @property {boolean} [formAssociated] This tells the browser to treat the element like a form control.

 * @property {Record< string, CSSStyleSheet | ((tag: string) => CSSStyleSheet) >} [adoptedStyleSheets] Allows to use Constructable Stylesheets.

 * Remember that you need to use Shadow DOM to be able to use Constructable Stylesheets. In case your component doesn't support this feature, it will return a style tag.

 * @property {false | ShadowRootInit} [shadow] Allows you to add a Shadow DOM. By default, it uses open mode on Autonomous Custom elements and does not use Shadow DOM on Customized built-in elements. Only the following elements are allowed to use Shadow DOM.

 * @property {Lifecycle & LifecycleInternals} [lifecycle] Contains all lifecycle methods.

 * @property {ExtendsType<ExtendableElements>} [extends] Allows to create a Customized built-in element

 */

/**

 * @template T

 * @typedef {object} CEEvent

 */

/**

 * @template {MichiElementOptions} O

 * @typedef {object} MichiElementClass

 * @property {string} tag

 * @property {string} [extends]

 * @property {Readonly<string[]>} observedAttributes

 * @property {O} elementOptions

 * @property {string} cssSelector

 * @property {string} internalCssSelector

 * @property {boolean} formAssociated

 */

/**

 * @typedef {object} Lifecycle

 * @property {() => void} [willConstruct] This method is called at the start of constructor.

 * @property {() => void} [didConstruct] This method is called at the end of constructor.

 * @property {() => void} [connected] This method is called when a component is connected to the DOM.

 * @property {() => void} [willMount] This method is called right before a component mounts.

 * @property {() => void} [didMount] This method is called after the component has mounted.

 * @property {() => void} [didUnmount] This method is called after a component is removed from the DOM.

 * @property {(name: string, newValue: unknown, oldValue: unknown) => void} [willReceiveAttribute] This method is called before a component does anything with an attribute.

 */

/**

 * @typedef {object} LifecycleInternals

 * @property {(form: HTMLFormElement) => void} [formAssociatedCallback] Called when the browser associates the element with a form element, or disassociates the element from a form element.

 * @property {(disabled: boolean) => void} [formDisabledCallback] Called after the disabled state of the element changes, either because the disabled attribute of this element was added or removed;

 * or because the disabled state changed on a `<fieldset>` that's an ancestor of this element. The disabled parameter represents the new

 * disabled state of the element. The element may, for example, disable elements in its shadow DOM when it is disabled.

 * @property {() => void} [formResetCallback] Called after the form is reset. The element should reset itself to some kind of default state.

 * For `<input>` elements, this usually involves setting the value property to match the value attribute set in markup (or in the case of a checkbox,

 * setting the checked property to match the checked attribute.

 * @property {(state: string, mode: FormStateRestoreCallbackMode) => void} [formStateRestoreCallback] Called in one of two circumstances:

 * * When the browser restores the state of the element (for example, after a navigation, or when the browser restarts). The mode argument is "restore" in this case.

 * * When the browser's input-assist features such as form autofilling sets a value. The mode argument is "autocomplete" in this case.

 *

 * The type of the first argument depends on how the setFormValue() method was called.

 */

/**

 * @typedef {object} ElementFactory

 * @property {(el: Node, jsx: JSX.Element) => boolean} compare

 * @property {(jsx: JSX.Element, isSVG?: boolean, isMATHML?: boolean, self?: Element) => ChildNode | ParentNode} create

 */

/**

 * @template {Element} [E = Element]

 * @typedef {object} CreateOptions

 * @property {boolean} [isSVG]

 * @property {boolean} [isMATHML]

 * @property {E} [contextElement]

 */

/**

 * @typedef {object} UseStyleSheet

 */

/**

 * @typedef {| "edge" | "chrome" | "firefox" | "safari" | "opera" | "android" | "iphone" | "unknown"} Browser

 */

/**

 * @template {object} T

 * @typedef {Extract<keyof T, string>} StringKeyOf

 */

/**

 * @template {string} T

 * @typedef {< V extends undefined | string | number = undefined, >( defaultValue?: V, ) => `var(${KebabCase<T>}${V extends undefined ? "" : `, ${V}`})`} CSSVar

 */

/**

 * @template {object | unknown} T

 * @template {string} [PK = "-"]

 * @typedef {IsAny<T> extends true ? any : T extends object ? { [k in StringKeyOf<T>]: CssVariablesObject<T[k], `${PK}-${k}`>; } : CSSVar<PK> & string} CssVariablesObject

 */

/**

 * @template X

 * @template Y

 * @template [A = X]

 * @template [B = never]

 * @typedef {(<T>() => T extends X ? 1 : 2) extends < T, >() => T extends Y ? 1 : 2 ? A : B} IfEquals

 */

/**

 * @template T

 * @typedef {{ [P in keyof T]-?: IfEquals< { [Q in P]: T[P]; }, { -readonly [Q in P]: T[P]; }, P >; }[keyof T]} WritableKeys

 */

/**

 * @template E

 * @typedef {Pick<E, WritableKeys<E>>} PickWritable

 */

/**

 * @typedef {| "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"} UpperCaseCharacters

 */

/**

 * @typedef {"-" | "_" | " "} WordSeparators

 */

/**

 * @template T

 * @typedef {[T, ...T[]]} ArrayWithOneOrMoreElements

 */

/**

 * @template T

 * @typedef {{ as?: T; } & GetElementProps<T>} ExtendableComponent

 */

/**

 * @template T

 * @typedef {ExtendableComponent<T> & { children?: never; }} ExtendableComponentWithoutChildren

 */

/**

 * @template {string} Source

 * @template {string} Delimiter

 * @typedef {Source extends "" ? [] : Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}` ? Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}` ? UsedDelimiter extends Delimiter ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}` ? [...SplitIncludingDelimiters<FirstPart, Delimiter>, UsedDelimiter, ...SplitIncludingDelimiters<SecondPart, Delimiter>, ] : never : never : never : [Source]} SplitIncludingDelimiters

 */

/**

 * @template {string} StringPart

 * @template {string} UsedWordSeparators

 * @template {string} UsedUpperCaseCharacters

 * @template {string} Delimiter

 * @typedef {StringPart extends UsedWordSeparators ? Delimiter : StringPart extends UsedUpperCaseCharacters ? `${Delimiter}${Lowercase<StringPart>}` : StringPart} StringPartToDelimiterCase

 */

/**

 * @template {any[]} Parts

 * @template {string} UsedWordSeparators

 * @template {string} UsedUpperCaseCharacters

 * @template {string} Delimiter

 * @typedef {Parts extends [`${infer FirstPart}`, ...infer RemainingParts] ? `${StringPartToDelimiterCase< FirstPart, UsedWordSeparators, UsedUpperCaseCharacters, Delimiter >}${StringArrayToDelimiterCase< RemainingParts, UsedWordSeparators, UsedUpperCaseCharacters, Delimiter >}` : ""} StringArrayToDelimiterCase

 */

/**

 * @template Value

 * @template {string} Delimiter

 * @typedef {Value extends string ? StringArrayToDelimiterCase< SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>, WordSeparators, UpperCaseCharacters, Delimiter > : Value} DelimiterCase

 */

/**

 * @template Value

 * @typedef {DelimiterCase<Value, "-">} KebabCase

 */

/**

 * @template T

 * @typedef {{ [K in keyof T]-?: {} extends Pick<T, K> ? never : K; }[keyof T]} RequiredKeys

 */

/**

 * @template T

 * @typedef {Exclude<keyof T, RequiredKeys<T>>} OptionalKeys

 */

/**

 * @template T

 * @typedef {(signal: T) => void} Subscription

 */

/**

 * @template T

 * @template E

 * @typedef {(signal: T, el: E) => void} RefSubscription

 */

/**

 * @template T

 * @typedef {ObservableType<T> | T} ObservableTypeOrConst

 */

/**

 * @template T

 * @typedef {ObservableLike<T> | T} ObservableOrConst

 */

/**

 * @template T

 * @typedef {{ [k in keyof T]: k extends "children" ? T[k] : ObservableOrConst<T[k]>; }} CreateFunctionalComponentProps

 */

/**

 * @template T

 * @typedef {( props: CreateFunctionalComponentProps<T>, ) => SingleJSXElement} CreateFunctionalComponent

 */

/**

 * @typedef {| "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"} Typeof

 */

/**

 * @template T

 * @typedef {T extends boolean ? Boolean : T extends number ? Number : T extends string ? String : T extends bigint ? BigInt : T extends symbol ? Symbol : { }} GetPrimitiveTypeClass

 */

/**

 * @template T

 * @typedef {T extends boolean ? boolean : T} GetPrimitiveType

 */

/**

 * @template T

 * @typedef {0 extends 1 & T ? true : false} IsAny

 */

/**

 * @typedef {ObservableTypeOrConst<Promise<any>>[]} usePromiseShouldWait

 */

/**

 * @template {SearchParams} [S = undefined]

 * @template {AnyObject | undefined | string} [B = undefined]

 * @typedef {() => DoFetchProps<S, B> | Promise<DoFetchProps<S, B>>} UseFetchCallback

 */

/**

 * @typedef {*[]} useWatchDeps

 */

/**

 * @template Y

 * @template [T = NonNullable<Y>]

 * @typedef {
  IsAny<T> extends true ? any : 
  [Y] extends [ObservableLike<any>] ? Y : 
  [T] extends [Array<infer V>] ? ObservableArray<V> : 
  [T] extends [Function] ? Y : 
  [T] extends [Map<infer K, infer V>] ? ObservableMap<K, V> : 
  [T] extends [Set<infer V>] ? ObservableSet<V> : 
  [T] extends [Date] ? PrimitiveObservableValue<Y> & Date : 
  [T] extends [object] ? ObservableObject<Y> : 
  PrimitiveObservableValue<GetPrimitiveType<Y>> & GetPrimitiveTypeClass<T>
} ObservableType

 */

/**

 * @template T

 * @typedef {IsAny<T> extends true ? any : T extends ObservableLike<infer Y> ? [Y] extends [object] ? { [k in keyof Y]: Unproxify<Y[k]> } : Y : T} Unproxify

 */

/**

 * @template RV

 * @typedef {PrimitiveObservableValue<RV>} ObservableComplexObject

 */

/**

 * @template RV

 * @template [SV = {

 *   [K in keyof RV]-?: ObservableType<RV[K]>;

 * }]

 * @typedef {SV & ObservableValue<RV, SV>} ObservableObject

 */

/**

 * @typedef {| "push" | "unshift" | "fill" | "splice"} MutableArrayNewItemsProperties

 */

/**

 * @typedef {"set"} MutableMapNewItemsProperties

 */

/**

 * @typedef {"add" | "delete"} MutableSetNewDeleteItemsProperties

 */

/**

 * @typedef {| MutableArrayNewItemsProperties | "shift" | "reverse" | "sort" | "pop"} MutableArrayProperties

 */

/**

 * @typedef {ObservableType<NonNullablePrimitiveType>} ObservableNonNullablePrimitiveType

 */

/**

 * @typedef {bigint | string | number | boolean} NonNullablePrimitiveType

 */

/**

 * @typedef {| NonNullablePrimitiveType | ObservableNonNullablePrimitiveType | null | undefined} PrimitiveType

 */

/**

 * @template T

 * @typedef {ReadonlyArray<DeepReadonly<T>>} DeepReadonlyArray

 */

/**

 * @template T

 * @typedef {{ readonly [P in keyof T]: DeepReadonly<T[P]>; }} DeepReadonlyObject

 */

/**

 * @template T

 * @typedef {T extends (infer R)[] ? DeepReadonlyArray<R> : T extends Function ? T : T extends object ? DeepReadonlyObject<T> : T} DeepReadonly

 */

/**

 * @typedef {| PrimitiveType | ObjectJSXElement | FunctionJSXElement | FragmentJSXElement | ClassJSXElement | ArrayJSXElement | DOMElementJSXElement | Node | ObservableLike<unknown>} SingleJSXElement

 */

/**

 * @typedef {SingleJSXElement[]} ArrayJSXElement

 */

/**

 * @template T

 * @template {keyof any} K

 * @typedef {T extends { [L in K]?: unknown; } ? Pick<T, K> : { }} PickIfExists

 */

/**

 * @template {keyof any} K

 * @typedef {{ [P in K]: never; }} Impossible

 */

/**

 * @template T

 * @template {T} [U = T]

 * @typedef {U & Impossible<Exclude<keyof U, keyof T>>} NoExtraProperties

 */

/**

 * @template [T = {}]

 * @typedef {{ [k in keyof T]: k extends "children" ? T[k] : ObservableType<T[k]>; }} FCProps

 */

/**

 * @template [T = {}]

 * @template {Element} [S = Element]

 * @template [C = CreateOptions<S>]

 * @typedef {(attrs: FCProps<T>, context?: C) => SingleJSXElement} CreateFCResult

 */

/**

 * @template [T = {}]

 * @template {Element} [S = Element]

 * @template [C = CreateOptions<S>]

 * @typedef {( attrs: T, context?: C, ) => SingleJSXElement} FC

 */

/**

 * @typedef {string | number | symbol} PropertyKey

 */

/**

 * @typedef {| CSSObject | CSSProperties | string | number | undefined | null} CSSProperty

 */

/**

 * @typedef {`${string}-${string}`} CustomElementTag

 */

/**

 * @typedef {Record<string, *>} AnyObject

 */

/**

 * @template {keyof any} K

 * @template T

 * @typedef {{ [P in K]?: T; }} OptionalRecord

 */

/**

 * @typedef {OptionalRecord<string, PrimitiveType | AnyObject>} AttributesType

 */

/**

 * @typedef {OptionalRecord< string, PrimitiveType | AnyObject >} ReflectedAttributesType

 */

/**

 * @typedef {CSSObject} CssVariablesType

 */

/**

 * @typedef {CSSObject} ReflectedCssVariablesType

 */

/**

 * @typedef {Record<string, Function>} MethodsType

 */

/**

 * @typedef {Record<string, EventDispatcher<unknown>>} EventsType

 */

/**

 * @typedef {Record<never, never>} EmptyObject

 */

/**

 * @typedef {keyof HTMLElements} ExtendableElements

 */

/**

 * @template {EventsType | undefined} E

 * @typedef {Readonly<{ [k in keyof E]: E[k] extends EventDispatcher<infer T> ? (detail?: T) => boolean : any; }>} CustomElementEvents

 */

/**

 * @template {ExtendsType<ExtendableElements> | undefined} O

 * @typedef {O extends ExtendsType<infer T> ? HTMLElements[T] : HTMLElements["div"]} ExtendsAttributes

 */

/**

 * @template {MichiElementOptions} O

 * @typedef {ObservableType< O["attributes"] & O["reflectedAttributes"] & O["cssVariables"] & O["reflectedCssVariables"] > & O["methods"] & CustomElementEvents<O["events"]> & MichiProperties & (O["extends"] extends { class: infer E } ? E extends new (...args: any ) => any ? InstanceType<E> : HTMLElement : HTMLElement)} MichiElementSelf

 */

/**

 * @template {MichiElementOptions} O

 * @template {HTMLElement} [S = MichiElementSelf<O>]

 * @template [Attrs = {

 *   [k in keyof O["reflectedAttributes"]as KebabCase<k>]?: ObservableOrConst<

 *     GetPrimitiveType<O["reflectedAttributes"][k]> | undefined

 *   >;

 * } & {

 *   [k in keyof O["reflectedCssVariables"]as KebabCase<k>]?: ObservableOrConst<

 *     GetPrimitiveType<O["reflectedCssVariables"][k]> | undefined

 *   >;

 * } & {

 *   [k in keyof O["events"]as k extends string

 *   ? `on${Lowercase<k>}`

 *   : never]?: O["events"][k] extends EventDispatcher<infer D>

 *   ? CEEvent<D>

 *   : never;

 * } & { name?: string } & GlobalEvents<S>]

 * @typedef {MichiAttributes<S> & Omit<ExtendsAttributes<O["extends"]>, keyof Attrs> & Attrs} MichiElementProps

 */

/**

 * @typedef {"restore" | "autocomplete"} FormStateRestoreCallbackMode

 */

/**

 * @template El

 * @typedef {El extends { new(arg: infer T): any; } ? T : El extends (...args: any) => any ? Parameters<El>[0] : El extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[El] : never} GetElementProps

 */

/**

 * @template T

 * @typedef {( tags: string, cssVariables: CssVariablesObject<T>, ) => CSSObject} UseStyleSheetCallback

 */
