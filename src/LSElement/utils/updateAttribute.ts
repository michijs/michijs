import { setAttributeValue } from './setAttribute';
import { LSCustomElement } from '../types';
import { standardizePropertyName } from '../properties/standardizePropertyName';

export function updateAttribute(elem: Element, attr: string, value: any) {
	try {
		elem[attr] = value;
	} catch (_) {//For readonly values only set attribute
	}

	const self = elem as LSCustomElement;
	let reflectAttribute = true;
	if (self.lsStatic?.observedAttributes) {
		const observedAttribute = self.lsStatic?.observedAttributes.find(x => standardizePropertyName(x.propertyName) === attr);
		if (observedAttribute) {
			reflectAttribute = observedAttribute.options?.reflect;
		}
	}
	if (reflectAttribute) {
		setAttributeValue(elem, value, attr);
	}
}