import { LSCustomElement } from '../types';
import { standardizePropertyName } from '../properties/standardizePropertyName';

export function setAttribute(self: LSCustomElement, newValue: any, key: string) {
	const formattedKey = standardizePropertyName(key);
	switch (true) {
		case newValue === undefined:
		case typeof newValue === 'boolean': {
			if (newValue) {
				self.setAttribute(formattedKey, '');
			} else {
				self.removeAttribute(formattedKey);
			}
			break;
		}
		case typeof newValue === 'object': {
			self.setAttribute(formattedKey, JSON.stringify(newValue));
			break;
		}
		default: {
			self.setAttribute(formattedKey, newValue);
		}
	}
}