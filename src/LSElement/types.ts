export type AttributeOptionsType = {
    reflect?: boolean;
}

export type StoredAttributeOptionsType = {
    key: string;
    method?: 'localStorage' | 'sessionStorage';
} & AttributeOptionsType

export type CustomEventDispatcher<T> = { dispatch: (detail: T) => boolean }

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

export type ElementMap = { tag: string, attrs: { [attribute: string]: any }, children: ElementMapChild[] };
export type ElementMapChild = ElementMap | string;
export type Store<T> = {
    getState?: () => T,
    subscribe?: (listener: ChangeFunction) => void,
    onFinishChanges?: (listener: () => void) => void,
    setState?: (key: string, newState: any) => void
}
export type WindowEventListener = (event: any) => void;

export type StyleSheetContainer = {
    adoptedStyleSheets: CSSStyleSheet[]
}

export type AdoptedStyleSheetList = {
    id: string
} & StyleSheetContainer

export type LsAttributesType = {
    alreadyRendered?: boolean,
    adoptedStyleSheets?: AdoptedStyleSheetList[],
    stateStore?: Store<Map<string,any>>,
    windowEventListeners?: WindowEventListener[],
}

export type LSNode = Node & { ls?: LsAttributesType }

export type RootElement = LSCustomElement | ShadowRoot;

export type RenderResult = ElementMap | ElementMap[] | undefined;

export interface LSCustomElement extends HTMLElement {
    _shadowRoot?: ShadowRoot;
    lsStatic?: LsStaticAttributesType,
    ls?: LsAttributesType,
    componentWillMount?(): void,
    componentDidMount?(): void,
    componentDidUnmount?(): void,
    componentWillUpdate?(): void,
    componentDidUpdate?(): void,
    componentWillReceiveAttribute?: (name: string, newValue, oldValue) => void;
    computedReflectedAttributes?: () => { [attribute: string]: any; };
    render(): RenderResult;
    staticChildren?: boolean;
}

export type AdoptedStyleChild = string | CSSStyleSheet;

export type ChangeFunction = (propertyKey?: string | number | symbol, newValue?: any, oldValue?: any) => void;

export type StorageLocalChangeEventType = { key: string, newValue: any };

export type ShadowOption = false | ShadowRootMode;
export type OtherShadowOptions = Omit<ShadowRootInit, 'mode'>;

export type AutonomousCustomElementConfig = {
    tag?: string;
    shadow?: ShadowOption;
} & OtherShadowOptions

export type CustomizedBuiltInElementConfig = AutonomousCustomElementConfig & {
    extends: keyof JSX.IntrinsicElements;
}

export type CustomElementConfig = Partial<CustomizedBuiltInElementConfig>;


