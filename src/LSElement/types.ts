import { HTMLElements } from '@lsegurado/htmltype';
import { EventDispatcher } from './classes';
import { idGenerator } from './hooks';
import { lsStore } from './hooks/lsStore';
import { Properties } from 'csstype';
import { LSTag } from './h/tags/LSTag';
import { GetAttributes } from '@lsegurado/htmltype/dist/Attributes';
import { FragmentTag } from './constants';

export type StringKeyOf<T extends object> = Extract<keyof T, string>;
type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;
type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];
type NonUndefined<A> = A extends undefined ? never : A;
export type NonFunctionKeys<T extends object> = {
    [K in keyof T]-?: NonUndefined<T[K]> extends Function ? never : K;
}[keyof T];
export type PickWritable<E> = Pick<E, WritableKeys<E>>;
export type PickNonFunction<E extends object> = Pick<E, NonFunctionKeys<E>>;

// export type LowerCaseCharacters = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
export type UpperCaseCharacters = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

export type WordSeparators = '-' | '_' | ' ';
export type ArrayWithOneOrMoreElements<T> = [T, ...T[]];

export type SplitIncludingDelimiters<Source extends string, Delimiter extends string> =
    Source extends '' ? [] :
    Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}` ?
    (
        Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
        ? UsedDelimiter extends Delimiter
        ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}`
        ? [...SplitIncludingDelimiters<FirstPart, Delimiter>, UsedDelimiter, ...SplitIncludingDelimiters<SecondPart, Delimiter>]
        : never
        : never
        : never
    ) :
    [Source];

type StringPartToDelimiterCase<StringPart extends string, UsedWordSeparators extends string, UsedUpperCaseCharacters extends string, Delimiter extends string> =
    StringPart extends UsedWordSeparators ? Delimiter :
    StringPart extends UsedUpperCaseCharacters ? `${Delimiter}${Lowercase<StringPart>}` :
    StringPart;

type StringArrayToDelimiterCase<Parts extends any[], UsedWordSeparators extends string, UsedUpperCaseCharacters extends string, Delimiter extends string> =
    Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
    ? `${StringPartToDelimiterCase<FirstPart, UsedWordSeparators, UsedUpperCaseCharacters, Delimiter>}${StringArrayToDelimiterCase<RemainingParts, UsedWordSeparators, UsedUpperCaseCharacters, Delimiter>}`
    : '';

export type DelimiterCase<Value, Delimiter extends string> = Value extends string
    ? StringArrayToDelimiterCase<
        SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
        WordSeparators,
        UpperCaseCharacters,
        Delimiter
    >
    : Value;

export type ExtendsKeys<T extends object, E> = {
    [K in keyof T]-?: NonUndefined<T[K]> extends E ? K : never;
}[keyof T];

export type KebabCase<Value> = DelimiterCase<Value, '-'>;

export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

// End Auxiliar Types
export interface ObserverCallback<T> {
    (value?: T): void
}

export interface ObservableLike<T = any> {
    subscribe(observer: ObserverCallback<T>): void,
    unsubscribe?(observer: ObserverCallback<T>): void,
}

export interface LSCustomElement extends Element, Lifecycle<any>, LifecycleInternals, Pick<ElementInternals, 'checkValidity' | 'reportValidity' | 'form' | 'validity' | 'validationMessage' | 'willValidate'> {
    readonly ls: {
        store: ReturnType<typeof lsStore>,
        cssStore: ReturnType<typeof lsStore>,
        alreadyRendered: boolean,
        shadowRoot?: ShadowRoot,
        adoptedStyleSheets: Map<string, CSSStyleSheet[]>,
        rerenderCallback(propertiesThatChanged: Array<string> | PropertyKey): void,
        pendingTasks: number,
        unSubscribeFromStore: Array<() => void>,
        idGen?: ReturnType<typeof idGenerator>['getId'],
        internals?: ElementInternals
    },
    render?(): JSX.Element,
    /**Allows to get a child element from the host with the selector */
    child<T extends (new () => HTMLElement) | HTMLElement = HTMLElement>(selector: string): T extends new () => HTMLElement ? InstanceType<T> : T,
    /**Forces the element to re-render */
    rerender(): void,
    /**Create unique IDs with a discernible key */
    readonly idGen: ReturnType<typeof idGenerator>['getId'],
    readonly name: string;
    readonly type: string;
    readonly cssSelector: string;
}

export type PrimitiveType = bigint | string | number | null | undefined | boolean;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> { }

type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export type DeepReadonly<T> =
    T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
    T extends object ? DeepReadonlyObject<T> :
    T;

export interface IterableAttrs {
    /**When iterating nodes its higly recomended to use keys */
    key?: number | string
}

export interface CommonJSXAttrs extends IterableAttrs { attrs?: (Record<string, any> & { children: JSX.Element[] }) }
export interface FragmentJSXElement extends CommonJSXAttrs { tag: typeof FragmentTag }
export type IterableJSX = AnyObject | ObjectJSXElement | FunctionJSXElement | ClassJSXElement | FragmentJSXElement;
export interface ObjectJSXElement extends CommonJSXAttrs { tag: string }
export interface FunctionJSXElement extends CommonJSXAttrs { tag: FC<any> }
export interface ClassJSXElement extends CommonJSXAttrs { tag: (new () => {}) & { tag: string, extends?: string } }
export type SingleJSXElement = PrimitiveType | ObjectJSXElement | FunctionJSXElement | FragmentJSXElement | ClassJSXElement | ArrayJSXElement;
export type ArrayJSXElement = Array<SingleJSXElement>;
// export type PureObjectJSXElement = { tag: string } & Omit<CommonJSXAttrs,'children'> & {children: (PureObjectJSXElement | string)[]};

export interface FC<T = {}, C = JSX.Element, S = Element> {
    (attrs: Omit<T, 'children'> & { children?: C }, self?: S | null): JSX.Element
}

export type CompatibleStyleSheet = string | CSSStyleSheet;

export type PropertyKey = string | number | symbol;
export interface ChangeFunction {
    (propertyPath?: string): void
}
export interface ValidatePropertyChangeFunction {
    (propertyPath?: string): boolean
}

export type CSSProperty = CSSObject | Properties | string;
export interface CSSObject {
    [key: string]: CSSProperty
}

export type Tag = `${string}-${string}`;

export type AnyObject = Record<PropertyKey, any>;

// I need to use object to avoid infinite loop in KeysAndKeysOf
export type AttributesType = Record<PropertyKey, PrimitiveType | AnyObject>;
export type ReflectedAttributesType = Record<PropertyKey, Exclude<PrimitiveType, true> | AnyObject>;

export type CssVariablesType = Record<string, PrimitiveType>;
export type ComputedCssVariablesType = Record<string, Function>;
export type ReflectedCssVariablesType = Record<string, Exclude<PrimitiveType, true>>;

export type MethodsType = Record<string, Function>

export type EventsType = Record<string, EventDispatcher<unknown>>

export type SubscribeToType = Record<string, ObservableLike>;

export type EmptyObject = Record<never, never>;

export interface LsStoreProps<T, Y> {
    /**Allows to define the store state. */
    state: T,
    /**Transactions are functions that notify changes at the end of the transaction. */
    transactions: Y
}

export type Self<
    CC extends ComputedCssVariablesType,
    RC extends ReflectedCssVariablesType,
    C extends CssVariablesType,
    M extends MethodsType,
    T extends MethodsType,
    E extends EventsType,
    A extends AttributesType,
    RA extends ReflectedAttributesType,
    NOA extends AttributesType,
    // TODO: Readonly LSCustomElement?
    EL extends Element> = RC & C & EL & A & RA & NOA & Readonly<CC & M & T & { [k in keyof E]: E[k] extends EventDispatcher<infer T> ? (detail?: T) => boolean : any }> & LSCustomElement;

interface Lifecycle<FRA> {
    /**This method is called right before a component mounts.*/
    willMount?(): void,
    /**This method is called after the component has mounted. */
    didMount?(): void,
    /**This method is called after a component is removed from the DOM. */
    didUnmount?(): void,
    /**This method is called before re-rendering occurs. */
    willUpdate?(): void,
    /**This method is called after re-rendering occurs. */
    didUpdate?(): void,
    /**This method is called before a component does anything with an attribute. */
    willReceiveAttribute?<WRAN extends keyof FRA>(name: WRAN, newValue: FRA[WRAN], oldValue: FRA[WRAN]): void,
}
export interface LifecycleInternals {
    /**Called when the browser associates the element with a form element, or disassociates the element from a form element. */
    formAssociatedCallback?(form: HTMLFormElement): void,
    /**Called after the disabled state of the element changes, either because the disabled attribute of this element was added or removed; 
     * or because the disabled state changed on a `<fieldset>` that's an ancestor of this element. The disabled parameter represents the new 
     * disabled state of the element. The element may, for example, disable elements in its shadow DOM when it is disabled. */
    formDisabledCallback?(disabled: boolean): void,
    /**
     * Called after the form is reset. The element should reset itself to some kind of default state. 
     * For `<input>` elements, this usually involves setting the value property to match the value attribute set in markup (or in the case of a checkbox, 
     * setting the checked property to match the checked attribute.
     */
    formResetCallback?(): void,
    /**
     * Called in one of two circumstances:
     * * When the browser restores the state of the element (for example, after a navigation, or when the browser restarts). The mode argument is "restore" in this case.
     * * When the browser's input-assist features such as form autofilling sets a value. The mode argument is "autocomplete" in this case.
     * 
     * The type of the first argument depends on how the setFormValue() method was called. 
     */
    formStateRestoreCallback?(state: string, mode: FormStateRestoreCallbackMode): void
}

export interface ElementFactory {
    compare(el: Node, jsx: JSX.Element): boolean;
    create(jsx: JSX.Element, isSVG: boolean, self: Element): ChildNode | ParentNode;
    update?(jsx: JSX.Element, el: Node, isSVG: boolean, self: Element): void
}

export type KeysAndKeysOf<O, P extends string = undefined, Order extends number | null = 1> =
    Order extends null ? '' : (
        O extends Array<any>
        ? (P extends undefined ? number : `${P}.${number}`)
        : (
            O extends Record<PropertyKey, any>
            ? (P extends undefined ? keyof O : `${P}.${StringKeyOf<O>}`)
            | keyof { [k in StringKeyOf<O> as (KeysAndKeysOf<O[k], P extends undefined ? k : `${P}.${k}`, Order extends 1 ? 2 : Order extends 2 ? 3 : null>)] }
            : ''
        ));

type FormStateRestoreCallbackMode = 'restore' | 'autocomplete';

export interface LSElementProperties<
    M extends MethodsType,
    T extends MethodsType,
    E extends EventsType,
    S extends SubscribeToType,
    A extends AttributesType,
    RA extends AttributesType,
    NOA extends AttributesType,
    FRA extends Object,
    FOA extends boolean,
    EL extends Element,
    EXTA extends keyof JSX.IntrinsicElements,
    C extends CssVariablesType,
    RC extends ReflectedCssVariablesType,
    FRC extends Object,
    CC extends ComputedCssVariablesType,
> {
    /**Allows to define attributes.*/
    attributes?: A,
    /**Allows to define CSS variables. CSS variables changes does not trigger a rerender*/
    cssVariables?: C,
    /**Allows to define non observed attributes. This is useful for complex objects that cannot be observed.*/
    nonObservedAttributes?(): NOA,
    /**
     * Allows to define reflected CSS variables and follows the Kebab case. CSS variables changes does not trigger a rerender
     * A reflected CSS variable cannot be initialized with a true value
     * @link https://developers.google.com/web/fundamentals/web-components/customelements#reflectattr
     */
    reflectedCssVariables?: RC,
    /**
     * Allows you to define CSS variables that depend on the state of the component.
     */
    computedCssVariables?: CC,
    /**
     * Allows to define reflected attributes and follows the Kebab case.
     * A reflected attribute cannot be initialized with a true value
     * @link https://developers.google.com/web/fundamentals/web-components/customelements#reflectattr
     */
    reflectedAttributes?: RA,
    /**Transactions are functions that notify changes at the end of the transaction.*/
    transactions?: T,
    /**Methods are functions that notify changes at the time of making the change.*/
    methods?: M,
    /**Function that renders the component.*/
    render?: Function;
    /**
     * Contains methods with a name of an attribute / reflected attribute / observable like. Those methods are executed when a change has been made to their corresponding property.
     */
    observe?: { [k in KeysAndKeysOf<RA>]?: () => void }
    & { [k in KeysAndKeysOf<A>]?: () => void }
    & (S extends EmptyObject ? { [k in keyof S]?: () => void } : EmptyObject)
    // observers?: ArrayWithOneOrMoreElements<[callback: (propertiesThatChanged: O[]) => void, target: ArrayWithOneOrMoreElements<O>]>,,
    /**
     * This tells the browser to treat the element like a form control.
     * @link https://web.dev/more-capable-form-controls/
     */
    formAssociated?: FOA,
    /**Contains all lifecycle methods.*/
    lifecycle?: Lifecycle<FRA & FRC> & LifecycleInternals,
    /**
     * Allows you to define an event to his parent and triggering it easily. It will be defined using Lower case. For example countChanged will be registered as countchanged.
     * @link https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
     */
    events?: E,
    /**
     * Allows you to subscribe to an observable like (like a store). When the store emit an event, the custom element will be re-rendered.
     * @link https://github.com/sindresorhus/type-fest/blob/main/source/observable-like.d.ts
     */
    subscribeTo?: S,
    /**
     * Allows you to add a Shadow DOM. By default, it uses open mode on Autonomous Custom elements and does not use Shadow DOM on Customized built-in elements. Only the following elements are allowed to use Shadow DOM.
     * @link https://dom.spec.whatwg.org/#dom-element-attachshadow
     */
    shadow?: false | ShadowRootInit,
    extends?: {
        tag: EXTA,
        class: new () => EL
    },
}

export interface CreateCustomElementStaticResult<FRC extends Object, FRA extends Object, FOA extends boolean, TA extends Tag, EXTA extends string> {
    readonly tag: TA,
    readonly extends?: EXTA,
    readonly observedAttributes: Readonly<Array<keyof FRA & keyof FRC>>
    formAssociated: FOA,
}

export type CreateCustomElementInstanceResult<
    CC extends ComputedCssVariablesType,
    RC extends ReflectedCssVariablesType,
    C extends CssVariablesType,
    A extends AttributesType,
    FRA extends Object,
    RA extends ReflectedAttributesType,
    M extends MethodsType,
    T extends MethodsType,
    E extends EventsType,
    NOA extends AttributesType,
    EL extends Element> = (
        new () => {
            props: LSTag<
                Partial<
                    FRA
                    & {
                        [k in StringKeyOf<E> as `on${Lowercase<k>}`]: E[k] extends EventDispatcher<infer D> ? (ev: CustomEvent<D>) => any : never
                    }
                    & HTMLElements.commonElement
                    & GetAttributes<'name'>
                >, Self<CC, RC, C, M, T, E, A, RA, NOA, EL>
            >
        } & Self<CC, RC, C, M, T, E, A, RA, NOA, EL>
    )

export type GetElementProps<El extends any> = El extends (new () => { props: any }) ? InstanceType<El>['props'] : (El extends (...args: any) => any ? Parameters<El>[0] : never)

export type EventListenerMap = Map<string, EventListener>;
declare global {

    interface Element {
        /**
         * Add/remove a list of events and bind them to their creator
         * @param src Who adds the event
         * @param ev A map containing the event and its callback
         */
        $setEventListeners(this: Element, src: Element, ev: EventListenerMap): void;
        /**
         * The list of events and who created them through the setEventListeners method
         */
        $eventListenerList?: Map<Element, EventListenerMap>;
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
    }

    interface Window {
        msCrypto?: Crypto
    }
}