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

export type LsAttributesType = {
    alreadyRendered?: boolean,
    attrsToListen?: string[],
    adoptedStyleSheets?: AdoptedStyleSheet[]
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
    render?(): HTMLElement | Array<HTMLElement> | any;
}

export type CallbackType = (propertyName: string, newValue: any, oldValue: any) => void;