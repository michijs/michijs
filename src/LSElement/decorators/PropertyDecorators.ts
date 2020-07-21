import type { LSCustomElement, AttributeOptionsType, PropertyOptionsType } from '../types';
import { initLsStatic } from '../properties/initLsStatic';
import { Store } from 'redux';

export function Attribute(options?: AttributeOptionsType) {
	return function (target: LSCustomElement, propertyKey: string) {
		target.lsStatic = initLsStatic(target.lsStatic);
		target.lsStatic.observedAttributes.push({ propertyName: propertyKey, options: options });
	};
}

export function Property(options?: PropertyOptionsType) {
	return function (target: LSCustomElement, propertyKey: string) {
		target.lsStatic = initLsStatic(target.lsStatic);
		target.lsStatic.properties.push({ propertyName: propertyKey, options: options });
	};
}

export function Child(id: string) {
	return function (target: LSCustomElement, propertyKey: string) {
		target.lsStatic = initLsStatic(target.lsStatic);
		target.lsStatic.elements.push({ id: id, propertyName: propertyKey });
	};
}

export function EventDispatcher(eventInitOptions?: Omit<CustomEventInit, 'detail'>) {
	return function (target: LSCustomElement, propertyKey: string) {
		target.lsStatic = initLsStatic(target.lsStatic);
		target.lsStatic.eventsDispatchers.push({ propertyName: propertyKey, eventInit: eventInitOptions });
	};
}

export function Redux(store: Store) {
	return function (target: LSCustomElement, propertyKey: string) {
		target.lsStatic = initLsStatic(target.lsStatic);
		target.lsStatic.stores.push({ propertyName: propertyKey, store: store });
	};
}