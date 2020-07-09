import { LSCustomElement, AttributeOptionsType, PropertyOptionsType, LsAttributesType } from '../types';

export function Attribute(options?: AttributeOptionsType) {
	return function (target: LSCustomElement, propertyKey: string) {
		target.ls = initLs(target.ls);
		target.ls.observedAttributes.push({ propertyName: propertyKey, options: options });
	};
}

export function Property(options?: PropertyOptionsType) {
	return function (target: LSCustomElement, propertyKey: string) {
		target.ls = initLs(target.ls);
		target.ls.properties.push({ propertyName: propertyKey, options: options });
	};
}

export function Child(id: string) {
	return function (target: LSCustomElement, propertyKey: string) {
		target.ls = initLs(target.ls);
		target.ls.elements.push({ id: id, propertyName: propertyKey });
	};
}

export function EventDispatcher(eventInitOptions?: Omit<CustomEventInit, 'detail'>) {
	return function (target: LSCustomElement, propertyKey: string) {
		target.ls = initLs(target.ls);
		target.ls.eventsDispatchers.push({ propertyName: propertyKey, eventInit: eventInitOptions });
	};
}

function initLs(ls: LsAttributesType): LsAttributesType {
	if (ls) {
		return ls;
	} else {
		return {
			elements: [],
			observedAttributes: [],
			properties: [],
			eventsDispatchers: []
		};
	}
}