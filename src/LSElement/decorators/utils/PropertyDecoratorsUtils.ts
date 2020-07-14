import { LSCustomElement, LsAttributesType } from '../../types';
import { updateChangesInDom, getRootNode } from './RenderUtils';
import { CustomEventDispatcher } from './CustomEventDispatcher';
import { formatToLowerCase } from '../../utils/formatToLowerCase';

export function addEventDispatchers(self: LSCustomElement) {
	self.ls.eventsDispatchers.forEach(eventDispatcher => {
		self[eventDispatcher.propertyName] = new CustomEventDispatcher(
			eventDispatcher.propertyName,
			self,
            eventDispatcher.eventInit?.bubbles,
            eventDispatcher.eventInit?.cancelable,
            eventDispatcher.eventInit?.composed
		);
	});
}

export function addElementsReferences(self: LSCustomElement) {
	self.ls.elements.forEach(element => {
		delete self[element.propertyName];
		Object.defineProperty(self, element.propertyName, {
			get() {
				return getRootNode(self).getElementById(element.id);
			},
		});
	});
}

export function addProperties(self: LSCustomElement) {
	self.ls.properties.forEach(property => {
		const oldValue = self[property.propertyName];
		delete self[property.propertyName];
		if (property.options?.reflect) {
			const formattedKey = standardizePropertyName(property.propertyName);
			Object.defineProperty(self, property.propertyName, {
				set(newValue) {
					const oldValue = self[property.propertyName];
					if (typeof newValue === 'boolean') {
						if (newValue) {
							self.setAttribute(formattedKey, '');
						} else {
							self.removeAttribute(formattedKey);
						}
					} else {
						self.setAttribute(formattedKey, newValue);
					}
					if (self.ls?.alreadyConnected) {
						updateChangesInDom(self);
						if (property.options.onChange) {
							self[property.options.onChange](newValue, oldValue);
						}
					}
				},
				get() {
					if (self.getAttribute(formattedKey) === 'true' || self.getAttribute(formattedKey) === 'false') {
						return self.hasAttribute(formattedKey);
					} else {
						return self.getAttribute(formattedKey);
					}
				},
			});
		} else {
			Object.defineProperty(self, property.propertyName, createGetterAndSetterWithObserver(self, property.propertyName, property.options?.onChange));
		}
		self[property.propertyName] = oldValue;
	});
}

export function addAttributes(self: LSCustomElement) {
	self.ls.observedAttributes.forEach(attribute => {
		const newAttributeId = standardizePropertyName(attribute.propertyName);
		const initialValue = self[attribute.propertyName];
		delete self[attribute.propertyName];
        
		Object.defineProperty(self, newAttributeId, createGetterAndSetterWithObserver(self, newAttributeId, attribute.options?.onChange));

		//First init for observedAttributes
		const attributeValue = self.getAttribute(newAttributeId);
		if (attributeValue === 'true' || attributeValue === 'false') {
			self[newAttributeId] = self.hasAttribute(newAttributeId);
		} else if (attributeValue) {
			self[newAttributeId] = attributeValue;
		} else {
			self.setAttribute(newAttributeId, initialValue);
		}
	});
}

export function createGetterAndSetterWithObserver(self: LSCustomElement, propertyKey: string, onChange: string) {
	const propertyRealKey = `_${propertyKey}`;
	return {
		set(newValue) {
			const oldValue = self[propertyRealKey];
			if (self.ls?.alreadyConnected) {
				updateChangesInDom(self);
				if (self[onChange]) {
					self[onChange](newValue, oldValue);
				}
			}
			self[propertyRealKey] = newValue;
		},
		get() {
			return self[propertyRealKey];
		},
	};
}

export function createGetterAndSetterForObservedAttributes(ls: LsAttributesType){
	return {
		get() {
			return ls.observedAttributes.map(attribute => standardizePropertyName(attribute.propertyName));
		},
	};
}

function standardizePropertyName(propertyName: string){
	return formatToLowerCase(propertyName);
}