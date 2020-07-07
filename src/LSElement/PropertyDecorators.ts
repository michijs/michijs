import { LSCustomElement, AttributeOptionsType, PropertyOptionsType } from './types';

export function Attribute(options?: AttributeOptionsType) {
    return function (target: LSCustomElement, propertyKey: string) {
        target.observedAttributes = safePush(target.observedAttributes, { propertyName: propertyKey, options: options });
    }
}

export function Property(options?: PropertyOptionsType) {
    return function (target: LSCustomElement, propertyKey: string) {
        target.properties = safePush(target.properties, {propertyName: propertyKey, options: options});
    }
}

export function Element(options: { id: string }) {
    return function (target: LSCustomElement, propertyKey: string) {
        target.elements = safePush(target.elements, { id: options.id, propertyName: propertyKey });
    }
}

function safePush<T>(array: T[], item: T) {
    if (!array) {
        return [item];
    } else {
        array.push(item);
        return array;
    }
}