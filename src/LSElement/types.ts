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

export interface LSCustomElement {
    elements?: ElementsType[],
    observedAttributes?: ObservedAttributesType[],
    properties?: PropertiesType[],
    componentWillMount?(),
    componentDidMount?(),
    componentWillUnmount?(),
    componentDidUnmount?(),
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    render(): HTMLElement | Array<HTMLElement>;
    styles(): Array<Promise<string>>;
    [memberName: string]: any;
}