import { Properties } from 'csstype';

export type AttributeOptionsType = {
    reflect?: boolean;
}

export type StoredAttributeOptionsType = {
    key: string;
    method?: 'localStorage' | 'sessionStorage';
} & AttributeOptionsType

export type EventDispatcherOptionsType = Omit<CustomEventInit, 'detail'>

export type StoredAttributeType = {
    propertyKey: string,
    options?: Omit<StoredAttributeOptionsType, 'reflect'>
}

export type StoresType = {
    propertyKey: string,
    store: Store<any>
}

export type ObserverType = {
    observedProperty: string,
    observerName: string,
}

export type LsStaticAttributesType = {
    stores: StoresType[],
    storedAttributes: StoredAttributeType[],
    reflectedAttributes: string[],
    attributes: string[],
    observers: ObserverType[],
    tag: string;
    extends: string;
}

export type AdoptedStyleSheet = { id: string, value: CSSStyleSheet };
export type ElementMap = { tag: string, attrs: { [attribute: string]: any }, children: ElementMapChild[] };
export type ElementMapChild = ElementMap | string;
export type Store<T> = { 
    getState?: () => T, 
    subscribe?: (listener: ChangeFunction) => any,
    onFinishChanges?: (listener: () => void) => any,
    setState?: (newState: Partial<T>) => void
}
export type WindowEventListener = (event: any) => void;

export type LsAttributesType = {
    alreadyRendered?: boolean,
    attrsManagedByH?: { [attribute: string]: any },
    adoptedStyleSheets?: AdoptedStyleSheet[],
    stateStore?: Store<any>,
    windowEventListeners?: WindowEventListener[],
}

export type LSNode = Node & { ls?: LsAttributesType }

export type RootElement = LSCustomElement | ShadowRoot;

export type RenderResult = ElementMap | ElementMap[] | any;

export interface LSCustomElement extends HTMLElement {
    _shadowRoot: ShadowRoot;
    lsStatic?: LsStaticAttributesType,
    ls?: LsAttributesType,
    componentWillMount?(): void,
    componentDidMount?(): void,
    componentDidUnmount?(): void,
    componentWillUpdate?(): void,
    componentDidUpdate?(): void,
    componentWillReceiveAttribute?: (name: string, newValue, oldValue) => void;
    computedReflectedAttributes?: () => { [attribute: string]: any; };
    render?(): RenderResult;
}

export type CSSProperties = Properties & { [selector: string]: string };

export type AdoptedStyleChild = string | CSSStyleSheet;

export type ChangeFunction = (propertyKey?: string | number | symbol, newValue?: any, oldValue?: any) => any;

export type StorageLocalChangeEventType = { key: string, newValue: any };

export type CustomizedBuiltInElementConfig = {
    tag?: string;
    extends: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
}

export type AutonomousCustomElementConfig = {
    tag?: string;
    shadow?: false | ShadowRootMode;
} & Omit<ShadowRootInit, 'mode'>
