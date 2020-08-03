import { setAttributeValue } from './setAttribute';

export function updateAttribute(elem: Element, attr: string, value: any) {
	if (attr === 'className') {
		const classValue = value === '' ? undefined : value;
		setAttributeValue(elem, classValue, 'class');
	} else if (attr === 'style') {
		elem.setAttribute('style', elem.getAttribute('style'));
	} else {
		try {
			elem[attr] = value;
			if (attr === 'is' && !elem.hasAttribute(attr)) {
				setAttributeValue(elem, value, attr);
			}
		} catch (_) {//For readonly values only set attribute
			setAttributeValue(elem, value, attr);
		}
	}
}