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
    eventsDispatchers: EventsDispatchersType[]
}

type LsSlotType = { [memberName: string]: Array<Element>; }

export type LsAttributesType = {
    alreadyRendered?: boolean,
    attributesProxy?: ProxyConstructor,
    attrsToListen?: string[],
    slot?: LsSlotType
}

export type RootElement = LSCustomElement | ShadowRoot;

export type LSCustomElement = {
    lsStatic?: LsStaticAttributesType,
    ls?: LsAttributesType,
    componentWillMount?(): void,
    componentDidMount?(): void,
    componentDidUnmount?(): void,
    componentWillUpdate?(): void,
    componentDidUpdate?(): void,
    componentWillReceiveAttribute?: (name: string, oldValue, newValue) => void;
    render?(): HTMLElement | Array<HTMLElement>;
    [memberName: string]: any;
} & HTMLElement;

export type CallbackType = (propertyName: string, newValue: any, oldValue: any) => void;