import { setAttributeValue } from './setAttribute';

export function updateAttribute(elem: Element, attr: string, value: any) {
	try {
		elem[attr] = value;
	} catch (_) {//For readonly values only set attribute
	}
	setAttributeValue(elem, value, attr);
}