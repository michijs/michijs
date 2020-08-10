import { LSCustomElement } from '../types';
import { updateChangesInDom } from '../render/updateChangesInDom';
import { convertToProxy } from '../utils/convertToProxy';
import { setAttribute } from '../utils/setAttribute';
import { standardizePropertyName } from './standardizePropertyName';

export function addAttributes(self: LSCustomElement) {
	const initialProxyValue = {};
	self.lsStatic.observedAttributes.forEach(attribute => {
		const attributeName = standardizePropertyName(attribute.propertyName);
		initialProxyValue[attribute.propertyName] = self[attributeName] || self[attribute.propertyName];
		delete self[attribute.propertyName];
		const definedProperty = {
			set(newValue) {
				self.ls.attributesProxy[attribute.propertyName] = newValue;
			},
			get() {
				return self.ls.attributesProxy[attribute.propertyName];
			},
		};
		Object.defineProperty(self, attribute.propertyName, definedProperty);
		if (attribute.propertyName !== attributeName) {
			delete self[attributeName];
			Object.defineProperty(self, attributeName, definedProperty);
		}
	});

	const callback = (propertyName: string, newValue, oldValue) => {
		const property = self.lsStatic.observedAttributes.find(x => x.propertyName === propertyName);
		updateChangesInDom(self);
		const onChange = property?.options?.onChange;
		if (onChange) {
			self[onChange](newValue, oldValue);
		}
		if (property.options?.reflect) {
			setAttribute(self, newValue, propertyName);
		}
	};

	self.ls.attributesProxy = convertToProxy(initialProxyValue, callback, self);
	self.lsStatic.observedAttributes.forEach(attribute => {
		if (attribute.options?.reflect) {
			setAttribute(self, initialProxyValue[attribute.propertyName], attribute.propertyName);
		}
	});
}