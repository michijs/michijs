import { LSCustomElement } from '../types';
import { standardizePropertyName } from './standardizePropertyName';
import { convertStringToDataType } from '../utils/convertStringToDataType';
import { convertDataTypeToAttribute } from '../utils/convertDataTypeToAttribute';
import { updateChangesInDom } from '../render/updateChangesInDom';

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