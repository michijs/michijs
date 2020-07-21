import { LSCustomElement, LsAttributesType, CallbackType, LsStaticAttributesType } from '../../types';
import { updateChangesInDom, getRootNode } from './RenderUtils';
import { CustomEventDispatcher } from './CustomEventDispatcher';
import { formatToLowerCase } from '../../utils/formatToLowerCase';

export function addEventDispatchers(self: LSCustomElement) {
	self.lsStatic.eventsDispatchers.forEach(eventDispatcher => {
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
	self.lsStatic.elements.forEach(element => {
		delete self[element.propertyName];
		Object.defineProperty(self, element.propertyName, {
			get() {
				return getRootNode(self).getElementById(element.id);
			},
		});
	});
}

export function addProperties(self: LSCustomElement) {
	const initialProxyValue = {};
	self.lsStatic.properties.forEach(property => {
		initialProxyValue[property.propertyName] = self[property.propertyName];
		delete self[property.propertyName];
		Object.defineProperty(self, property.propertyName, {
			set(newValue) {
				self.ls.propertiesProxy[property.propertyName] = newValue;
			},
			get() {
				return self.ls.propertiesProxy[property.propertyName];
			},
		});
		if (property?.options?.reflect) {
			convertDataTypeToAttribute(initialProxyValue[property.propertyName], self, property.propertyName);
		}
	});

	const callback = (propertyName: string, newValue, oldValue) => {
		if (self.ls.alreadyConnected) {
			updateChangesInDom(self);
			const property = self.lsStatic.properties.find(x => x.propertyName === propertyName);
			const onChange = property?.options?.onChange;
			if (onChange) {
				self[onChange](newValue, oldValue);
			}
			if (property?.options?.reflect) {
				convertDataTypeToAttribute(newValue, self, propertyName);
			}
		}
	};

	self.ls.propertiesProxy = createProxyForEachValue(initialProxyValue, callback, self);
}

function createProxyForEachValue(initialValue, callback: CallbackType, self: LSCustomElement, propertyName?: string) {
	const proxyInitialValue = {};
	Object.keys(initialValue).forEach(key => {
		if (Array.isArray(initialValue[key])) {
			proxyInitialValue[key] = createProxy(initialValue[key], callback, self, propertyName || key);
		} else if (typeof initialValue[key] === 'object') {
			proxyInitialValue[key] = createProxyForEachValue(initialValue[key], callback, self, propertyName || key);
		} else {
			proxyInitialValue[key] = initialValue[key];
		}
	});
	return createProxy(proxyInitialValue, callback, self, propertyName);

}

function createProxy(initialValue, callback: CallbackType, self: LSCustomElement, propertyName?: string) {
	return new Proxy(initialValue, {
		deleteProperty: function (_target, property: string) {
			callback(propertyName || property, undefined, undefined);
			return true;
		},
		get: function (target, property: string) {
			if (typeof target[property] === 'function') {
				return function (...args) {
					const callBackPropertyName = propertyName;
					const callBackOldValue = self[callBackPropertyName];
					const oldValue = Object.values(target);
					const result = Array.prototype[property].apply(target, args);
					const newValue = target;
					if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
						const callBackNewValue = self[callBackPropertyName];
						callback(callBackPropertyName, callBackNewValue, callBackOldValue);
					}
					return result;
				};
			}
			return target[property];
		},
		set: function (target, property: string, newValue, _receiver) {
			const callBackPropertyName = propertyName || property;
			const callBackOldValue = self[callBackPropertyName];
			target[property] = newValue;
			const callBackNewValue = self[callBackPropertyName];
			callback(callBackPropertyName, callBackNewValue, callBackOldValue);
			return true;
		}
	});
}

export function addAttributes(self: LSCustomElement) {
	self.ls.attributesProxy = {};
	self.lsStatic.observedAttributes.forEach(attribute => {
		const attributeName = standardizePropertyName(attribute.propertyName);
		
		if (self.hasAttribute(attributeName)) {
			self.ls.attributesProxy[attribute.propertyName] = convertStringToDataType(self.getAttribute(attributeName));
		} else {
			self.ls.attributesProxy[attribute.propertyName] = self[attribute.propertyName];
			convertDataTypeToAttribute(self[attribute.propertyName], self, attributeName);
		}
		delete self[attribute.propertyName];

		Object.defineProperty(self, attributeName, {
			set(newValue) {
				const oldValue = self.ls.attributesProxy[attribute.propertyName];
				self.ls.attributesProxy[attribute.propertyName] = newValue;
				if (self.ls?.alreadyConnected) {
					updateChangesInDom(self);
					const property = self.lsStatic.properties.find(x => x.propertyName === attribute.propertyName);
					if (self[property?.options?.onChange]) {
						self[property?.options?.onChange](newValue, oldValue);
					}
				}
			},
			get() {
				return self.ls.attributesProxy[attribute.propertyName];
			},
		});
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

export function createGetterAndSetterForObservedAttributes(lsStatic: LsStaticAttributesType) {
	return {
		get() {
			return lsStatic.observedAttributes.map(attribute => standardizePropertyName(attribute.propertyName));
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

export function convertDataTypeToAttribute(newValue: any, self: LSCustomElement, key: string) {
	const formattedKey = standardizePropertyName(key);
	switch (true) {
		case typeof newValue === 'boolean': {
			if (newValue) {
				self.setAttribute(formattedKey, '');
			} else {
				self.removeAttribute(formattedKey);
			}
			break;
		}
		// case typeof newValue === 'object': {
		// 	console.log(formattedKey);
		// 	console.log(JSON.stringify(newValue));
		// 	self.setAttribute(formattedKey, JSON.stringify(newValue).toString());
		// }
		default: {
			self.setAttribute(formattedKey, newValue);
		}
	}
}