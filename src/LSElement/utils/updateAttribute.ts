import { setAttributeValue } from './setAttribute';

export function updateAttribute(elem: Element, attr: string, value: any) {
	if (attr === 'className') {
		const classValue = value === '' ? undefined : value;
		setAttributeValue(elem, classValue, 'class');
	} else if (attr === 'style') {
		elem.setAttribute('style', elem.getAttribute('style'));
	} else {
		try {
			if (Object.keys(elem).includes(attr)) {
				elem[attr] = value;
			} else {
				setAttributeValue(elem, value, attr);
			}
		} catch (_) {//For readonly values only set attribute
			setAttributeValue(elem, value, attr);
		}
	}
}