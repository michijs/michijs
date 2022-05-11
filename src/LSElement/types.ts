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
export type AdoptedStyleSheetList = {
    id: string,
    items: CSSStyleSheet[]
}

export type ObserverCallback<T> = (value?: T) => void;

export type ObservableLike<T = any> = {
    subscribe(observer: ObserverCallback<T>): void,
    unsubscribe?(observer: ObserverCallback<T>): void,
}

export interface LSCustomElement extends Element, Lifecycle<any>, LifecycleInternals, Pick<ElementInternals, 'checkValidity' | 'reportValidity' | 'form' | 'validity' | 'validationMessage' | 'willValidate'> {
    ls: {
        store: ReturnType<typeof lsStore>,
        alreadyRendered: boolean,
        shadowRoot?: ShadowRoot,
        adoptedStyleSheets: AdoptedStyleSheetList[],
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
    idGen: ReturnType<typeof idGenerator>['getId'],
    name: string;
    type: string;
}

export type EmptyType = null | undefined | false;
export type PrimitiveType = bigint | string | number | true | AnyObject;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> { }

type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export type DeepReadonly<T> =
    T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
    T extends object ? DeepReadonlyObject<T> :
    T;

export type IterableAttrs = {
    /**When iterating nodes its higly recomended to use keys */
    key?: number | string
}

export type CommonJSXAttrs = { attrs?: (Record<string, any> & { children: JSX.Element[] }) } & IterableAttrs
export type FragmentJSXElement = { tag: typeof FragmentTag } & CommonJSXAttrs;
export type IterableJSX = AnyObject | ObjectJSXElement | FunctionJSXElement | ClassJSXElement | FragmentJSXElement;
export type ObjectJSXElement = { tag: string } & CommonJSXAttrs;
export type FunctionJSXElement = { tag: FC<any> } & CommonJSXAttrs;
export type ClassJSXElement = { tag: (new () => {}) & { tag: string, extends?: string } } & CommonJSXAttrs;
export type SingleJSXElement = EmptyType | PrimitiveType | ObjectJSXElement | FunctionJSXElement | FragmentJSXElement | ClassJSXElement | ArrayJSXElement;
export type ArrayJSXElement = Array<SingleJSXElement>;
// export type PureObjectJSXElement = { tag: string } & Omit<CommonJSXAttrs,'children'> & {children: (PureObjectJSXElement | string)[]};

export type FC<T = {}, C = JSX.Element, S = LSCustomElement> = (attrs: Omit<T, 'children'> & { children?: C }, self?: S | null) => JSX.Element;

export type CompatibleStyleSheet = string | CSSStyleSheet;

export type PropertyKey = string | number | symbol;
export type ChangeFunction = (propertyPath?: string) => void;
export type ValidatePropertyChangeFunction = (propertyPath?: string) => boolean;

export type CSSProperty = CSSObject | Properties | string;
export type CSSObject = { [key: string]: CSSProperty }

export type Tag = `${string}-${string}`;
export type LSElementConfig<EX extends keyof JSX.IntrinsicElements, EL extends Element> = Tag | {
    tag: Tag,
    extends: EX,
    class: new () => EL
}

export type AnyObject = Record<PropertyKey, any>;

// I need to use object to avoid infinite loop in KeysAndKeysOf
export type AttributesType = object;

export type MethodsType = Record<string, Function>

export type EventsType = Record<string, EventDispatcher<unknown>>

export type SubscribeToType = Record<string, ObservableLike>;

export type EmptyObject = Record<never, never>;

export type LsStoreProps<T, Y> = {
    /**Allows to define the store state. */
    state: T,
    /**Transactions are functions that notify changes at the end of the transaction. */
    transactions: Y
};

export type Self<M extends MethodsType,
    T extends MethodsType,
    E extends EventsType,
    A extends AttributesType,
    RA extends AttributesType,
    EL extends Element> = EL & A & RA & M & T & { [k in keyof E]: E[k] extends EventDispatcher<infer T> ? (detail?: T) => boolean : any } & LSCustomElement;

type Lifecycle<FRA> = {
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
};
export type LifecycleInternals = {
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

export type LSElementProperties<
    M extends MethodsType,
    T extends MethodsType,
    E extends EventsType,
    S extends SubscribeToType,
    A extends AttributesType,
    RA extends AttributesType,
    FRA extends Object
    > = {
        /**Allows to define attributes.*/
        attributes?: A,
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
        formAssociated?: boolean
        /**Contains all lifecycle methods.*/
        lifecycle?: Lifecycle<FRA> & LifecycleInternals,
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
        shadow?: false | ShadowRootInit
    }

export type CreateCustomElementResult<
    A extends AttributesType,
    FRA extends Object,
    RA extends AttributesType,
    M extends MethodsType,
    T extends MethodsType,
    E extends EventsType,
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
                >, Self<M, T, E, A, RA, EL>
            >
            // & JSX.IntrinsicElements[EX]
        } & Self<M, T, E, A, RA, EL>
    ) & { tag: string, extends?: string }

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
    interface Document {
        adoptedStyleSheets?: Readonly<CSSStyleSheet[]>;
    }
    interface ShadowRoot {
        adoptedStyleSheets?: Readonly<CSSStyleSheet[]>;
    }
    interface CSSStyleSheet {
        replaceSync(css: string); void;
    }

    interface Window {
        msCrypto?: Crypto
    }

    type FormValue = string | File | FormData;
    interface ElementInternals extends Pick<HTMLButtonElement, 'checkValidity' | 'reportValidity' | 'form' | 'validity' | 'validationMessage' | 'willValidate'> {
        setValidity?(props: { customError?: boolean }, message?: string): void,
        setFormValue?(value: FormValue): void
    }

}