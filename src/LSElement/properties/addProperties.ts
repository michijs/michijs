import { LSCustomElement, CallbackType } from '../types';
import { convertDataTypeToAttribute } from '../utils/convertDataTypeToAttribute';
import { updateChangesInDom } from '../render/updateChangesInDom';

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