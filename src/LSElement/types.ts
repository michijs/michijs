import { Store } from 'redux';

export type AttributeOptionsType = {
    onChange?: string;
    reflect?: boolean;
}

export type ObservedAttributesType = {
    propertyName: string,
    options?: AttributeOptionsType
}

export type ElementsType = {
    propertyName: string,
    id: string
};

export type EventsDispatchersType = {
    propertyName: string,
    eventInit?: Omit<CustomEventInit, 'detail'>
}

export type StoresType = {
    propertyName: string,
    store: Store
}

export type LsStaticAttributesType = {
    stores: StoresType[],
    elements: ElementsType[],
    observedAttributes: ObservedAttributesType[],
    eventsDispatchers: EventsDispatchersType[],
    tag: string;
    extends: string;
}

type ComputedReflectedAttribute = { [attribute: string]: any; }
type AdoptedStyleSheet = { id: string, value: CSSStyleSheet };
export type ElementMap = {tag: string, attrs: {[attribute: string]: any}, children: ElementMap[] | string[]}

export type LsAttributesType = {
    alreadyRendered?: boolean,
    attrsManagedByH?: {[attribute: string]: any},
    adoptedStyleSheets?: AdoptedStyleSheet[],
}

export type RootElement = LSCustomElement | ShadowRoot;

export interface LSCustomElement extends HTMLElement {
    lsStatic?: LsStaticAttributesType,
    ls?: LsAttributesType,
    componentWillMount?(): void,
    componentDidMount?(): void,
    componentDidUnmount?(): void,
    componentWillUpdate?(): void,
    componentDidUpdate?(): void,
    componentWillReceiveAttribute?: (name: string, oldValue, newValue) => void;
    computedReflectedAttributes?: () => ComputedReflectedAttribute;
    render?(): ElementMap | ElementMap[] | any;
}

export type CallbackType = (propertyName: string, newValue: any, oldValue: any) => void;