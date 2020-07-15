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
		const proxyName = `_${property.propertyName}`;
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
					self[proxyName] = newValue;
					if (self.ls?.alreadyConnected) {
						updateChangesInDom(self);
						if (property.options.onChange) {
							self[property.options.onChange](newValue, oldValue);
						}
					}
				},
				get() {
					return self[proxyName];
				},
			});
		} else {
			Object.defineProperty(self, property.propertyName, createGetterAndSetterWithObserver(self, proxyName, property.options?.onChange));
		}

		self[property.propertyName] = oldValue;
	});
}

export function addAttributes(self: LSCustomElement) {
	self.ls.observedAttributes.forEach(attribute => {
		const attributeRealName = standardizePropertyName(attribute.propertyName);
		const initialValue = self[attribute.propertyName];
		delete self[attribute.propertyName];

		Object.defineProperty(self, attributeRealName, createGetterAndSetterWithObserver(self, `_${attribute.propertyName}`, attribute.options?.onChange));
		if (attributeRealName !== attribute.propertyName) {
			Object.defineProperty(self, attribute.propertyName, createGetterAndSetterWithObserver(self, attributeRealName, undefined));
		}
		//First init for observedAttributes
		if (self.hasAttribute(attributeRealName)) {
			self[attributeRealName] = convertStringToDataType(self.getAttribute(attributeRealName));
		} else {
			self.setAttribute(attributeRealName, initialValue);
		}
	});
}

export function createGetterAndSetterWithObserver(self: LSCustomElement, proxyKey: string, onChange: string) {
	return {
		set(newValue) {
			const oldValue = self[proxyKey];
			self[proxyKey] = newValue;
			if (self.ls?.alreadyConnected) {
				updateChangesInDom(self);
				if (self[onChange]) {
					self[onChange](newValue, oldValue);
				}
			}
		},
		get() {
			return self[proxyKey];
		},
	};
}

export function createGetterAndSetterForObservedAttributes(ls: LsAttributesType) {
	return {
		get() {
			return ls.observedAttributes.map(attribute => standardizePropertyName(attribute.propertyName));
		},
	};
}

function standardizePropertyName(propertyName: string) {
	return formatToLowerCase(propertyName);
}

export function convertStringToDataType(newValue: string) {
	const intValue = parseInt(newValue);
	switch (true) {
		case newValue === '':
		case newValue === 'true': {
			return true;
		}
		case newValue === 'false': {
			return false;
		}
		case !Number.isNaN(intValue): {
			return intValue;
		}
		default: {
			return newValue;
		}
	}
}