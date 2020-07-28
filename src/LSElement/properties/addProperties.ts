import { LSCustomElement } from '../types';
import { updateChangesInDom } from '../render/updateChangesInDom';
import { convertToProxy } from '../utils/convertToProxy';
import { setAttribute } from '../utils/setAttribute';

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
			setAttribute(self, initialProxyValue[property.propertyName], property.propertyName);
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
				setAttribute(self, newValue, propertyName);
			}
		}
	};

	self.ls.propertiesProxy = convertToProxy(initialProxyValue, callback, self);
}