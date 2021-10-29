import { commonElement } from '@lsegurado/htmltype/HTMLElements';
import { EventDispatcher } from './classes';
import { idGenerator } from './hooks';
import { lsStore } from './hooks/lsStore';
import { Properties } from 'csstype';
import { LSTag } from './h/tags/LSTag';

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

export type AttributeOptionsType = {
    reflect?: boolean;
}

export type AsString<T extends PropertyKey> = Extract<T, string>;

export type ObjectOf<T> = { [propertyName: string]: T }

// End Auxiliar Types

export type StyleSheetContainer = {
    adoptedStyleSheets: CSSStyleSheet[]
}

export type AdoptedStyleSheetList = {
    id: string,
    items: CSSStyleSheet[]
}

export type ObserverCallback<T> = (value?: T) => void;

export type ObservableLike<T = any> = {
    subscribe(observer: ObserverCallback<T>): void,
    unsubscribe?(observer: ObserverCallback<T>): void,
}
export interface LSElement extends Element {
    ls?: {
        eventListeners?: { addedBy?: LSCustomElement, eventName: string, event: EventListenerOrEventListenerObject }[];
    },
    staticChildren?: boolean,
}

export type DefaultChildren = JSX.Element | JSX.Element[];

export interface LSCustomElement extends LSElement, Lifecycle<any> {
    ls: {
        store: ReturnType<typeof lsStore>,
        alreadyRendered: boolean,
        shadowRoot?: ShadowRoot,
        adoptedStyleSheets: AdoptedStyleSheetList[],
        rerenderCallback(propertiesThatChanged: Set<PropertyKey> | PropertyKey): void,
        pendingTasks: number,
        unSubscribeFromStore: Array<() => void>,
        idGen?: ReturnType<typeof idGenerator>['getId']
    } & LSElement['ls'],
    render?(): DefaultChildren,
    /**Allows to get a child element from the host with the id */
    child<T = HTMLElement>(id: string): T,
    /**Forces the element to re-render */
    rerender(): void,
    /**Create unique IDs with a discernible key */
    idGen: ReturnType<typeof idGenerator>['getId']
}

export type PrimitiveType = bigint | null | undefined | string | number | boolean | AnyObject;

export type CommonJSXAttrs = { attrs?: { [attribute: string]: any } | null, children: JSX.Element[] }
export type FragmentJSXElement = { tag: undefined, attrs: null } & Omit<CommonJSXAttrs, 'attrs'>;
export type ObjectJSXElement = { tag: string } & CommonJSXAttrs;
export type FunctionJSXElement = { tag: FC<any> } & CommonJSXAttrs;
export type ClassJSXElement = { tag: (new () => {}) & { tag: string, extends?: string } } & CommonJSXAttrs;
export type SingleJSXElement = PrimitiveType | ObjectJSXElement | FunctionJSXElement | FragmentJSXElement | ClassJSXElement;
export type ArrayJSXElement = Array<SingleJSXElement>;
// export type PureObjectJSXElement = { tag: string } & Omit<CommonJSXAttrs,'children'> & {children: (PureObjectJSXElement | string)[]};

export type FC<T = commonElement, C = DefaultChildren, S = LSCustomElement> = (attrs: Omit<T, 'children'> & { children?: C }, children: C, self?: S | null) => JSX.Element;

export type CompatibleStyleSheet = string | CSSStyleSheet;

export type StorageLocalChangeEventType = { key: string, newValue: any };

export type Metadata<RA> = {
    tag: `${string}-${string}`,
} & Partial<{
    extends: keyof JSX.IntrinsicElements;
    reflectedAttributes: RA,
}>

export type PropertyKey = string | number | symbol;
export type ChangeFunction = (propertyThatChanged?: PropertyKey) => void;
export type ValidatePropertyChangeFunction = (propertyThatChanged?: PropertyKey) => boolean;

export type CSSProperty = CSSObject | Properties | string;
export type CSSObject = { [key: string]: CSSProperty }

export type Tag = `${string}-${string}`;
export type LSElementConfig<EX extends keyof JSX.IntrinsicElements, EL extends Element> = Tag | {
    tag: Tag,
    extends: EX,
    class: new () => EL
}

export type AnyObject = Record<string | number | symbol, unknown>;

export type AttributesType = AnyObject;

export type MethodsType = Record<string, Function>

export type EventsType = Record<string, EventDispatcher<any>>

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
    EL extends Element> = EL & A & RA & M & T & { [k in keyof E]: E[k] extends EventDispatcher<infer T> ? (detail: T) => boolean : any } & LSCustomElement;

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
    willReceiveAttribute?<WRAN extends keyof FRA>(name: WRAN, newValue: FRA[WRAN], oldValue: FRA[WRAN]): void
};

type ReplaceObjectValue<O, V> = O extends EmptyObject ? { [k in keyof O]?: V } : EmptyObject;

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
        observe?: ReplaceObjectValue<RA, () => void>
        & ReplaceObjectValue<A, () => void>
        & ReplaceObjectValue<S, () => void>,
        // observers?: ArrayWithOneOrMoreElements<[callback: (propertiesThatChanged: O[]) => void, target: ArrayWithOneOrMoreElements<O>]>,
        /**Contains all lifecycle methods.*/
        lifecycle?: Lifecycle<FRA>,
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
        shadow?: false | Partial<ShadowRootInit>
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
                    & { [k in StringKeyOf<E> as `on${Lowercase<k>}`]: E[k] extends EventDispatcher<infer D> ? (ev: CustomEvent<D>) => any : never }
                    & commonElement
                >, Self<M, T, E, A, RA, EL>
            >
            // & JSX.IntrinsicElements[EX]
        } & Self<M, T, E, A, RA, EL>
    ) & { tag: string, extends?: string }

export type GetElementProps<El extends any> = El extends (new () => { props: any }) ? InstanceType<El>['props'] : El extends FC ? Parameters<El>[0] : never
