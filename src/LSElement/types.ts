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

export type LsStaticAttributesType = {
    elements: ElementsType[],
    observedAttributes: ObservedAttributesType[],
    properties: PropertiesType[],
    eventsDispatchers: EventsDispatchersType[]
}

export type LsAttributesType = {
    alreadyConnected?: boolean,
    propertiesProxy?: ProxyConstructor,
    attributesProxy?: any
}

export type RootElement = LSCustomElement | ShadowRoot;

export type LSCustomElement = {
    lsStatic?: LsStaticAttributesType,
    ls?: LsAttributesType,
    componentWillMount?(): void,
    componentDidMount?(): void,
    componentWillUnmount?(): void,
    componentDidUnmount?(): void,
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    render?(): HTMLElement | Array<HTMLElement>;
    [memberName: string]: any;
} & HTMLElement;

export type CallbackType = (propertyName: string, newValue: any, oldValue: any) => void;