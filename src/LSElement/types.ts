export type AttributeOptionsType = {
    onChange?: string;
}

export type PropertyOptionsType = {
    reflect?: boolean;
    onChange?: string;
}

export type ObservedAttributesType = {
    propertyName: string,
    options: AttributeOptionsType
}

export type PropertiesType = {
    propertyName: string,
    options: PropertyOptionsType
}

export type ElementsType = {
    propertyName: string,
    id: string
};

export type EventsDispatchersType = {
    propertyName: string,
    eventInit?: Omit<CustomEventInit, 'detail'>
}

export type LsAttributesType = {
    alreadyConnected?: boolean,
    elements?: ElementsType[],
    observedAttributes?: ObservedAttributesType[],
    properties?: PropertiesType[],
    eventsDispatchers?: EventsDispatchersType[],
    styles?: HTMLStyleElement,
    propertiesProxy: ProxyConstructor,
    attributesProxy: any
}

export type RootElement = LSCustomElement | ShadowRoot;

export type StylesType = Array<Promise<{ default: string } | string>>;

export interface LSCustomElement extends HTMLElement {
    ls?: LsAttributesType,
    componentWillMount?(): void,
    componentDidMount?(): void,
    componentWillUnmount?(): void,
    componentDidUnmount?(): void,
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    render?(): HTMLElement | Array<HTMLElement>;
    styles?(): StylesType;
    [memberName: string]: any;
}

export type CallbackType = (propertyName: string, newValue: any, oldValue: any) => void;