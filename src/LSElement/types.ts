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

export type eventsDispatchersType = {
    propertyName: string,
    eventInit?: Omit<CustomEventInit, 'detail'>
}

export type LsAttributesType = {
    elements: ElementsType[],
    observedAttributes: ObservedAttributesType[],
    properties: PropertiesType[],
    eventsDispatchers: eventsDispatchersType[]
}

export type StylesType = Array<Promise<{ default: string } | string>>;

export interface LSCustomElement extends HTMLElement {
    ls?: LsAttributesType,
    componentWillMount?(),
    componentDidMount?(),
    componentWillUnmount?(),
    componentDidUnmount?(),
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    render?(): HTMLElement | Array<HTMLElement>;
    styles?(): StylesType;
    [memberName: string]: any;
}