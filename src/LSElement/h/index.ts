import { setAttributeValue } from '../utils/setAttribute';

export interface FunctionComponent {
	(attrs: any, ...children): HTMLElement;
}

export const h = {
	createElement(tag: string | FunctionComponent, attrs, ...children) {
		if (tag === undefined) {
			return children;
		}

		if (tag === 'svg') {
			return createAndAppendSVG(tag, attrs, ...children);
		}

		if (typeof tag === 'function') {
			return tag(attrs, children);
		}

		const elem = createElement(tag, attrs);
		for (const child of children) {
			appendChild(elem, child);
		}
		return elem;
	},
};


function appendChild(elem, children) {
	if (!children || children === undefined) return;

	if (children instanceof Array) {
		children.map(child => appendChild(elem, child));
		return;
	}

	let child = children;

	const isACustomElement = window.customElements.get(elem.getAttribute('is') || elem.tagName.toLowerCase()) !== undefined;

	if (!(child instanceof Node)) {
		child = document.createTextNode(child.toString());
	}
	if (!isACustomElement) {
		elem.appendChild(child);
	} else {
		elem.ls = elem.ls || {};
		elem.ls.slot = elem.ls.slot || {};
		const slotName: string = child.getAttribute('slot') || 'default';
		elem.ls.slot[slotName] = elem.ls.slot[slotName] || [];
		elem.ls.slot[slotName].push(child);
	}
}

function createElement(elem, attrs) {
	if (typeof elem.render === 'function') {
		return elem.render();
	}
	if (elem instanceof Function) {
		return elem(attrs);
	}
	if (elem instanceof HTMLElement) {
		addAttributes(elem, attrs);
		return elem;
	}

	let element;
	if (attrs && attrs['is']) {
		element = document.createElement(elem, attrs['is']);
	} else {
		element = document.createElement(elem);
	}
	addAttributes(element, attrs);
	return element;
}

export function render(elem, parent) {
	parent.insertAdjacentElement('afterbegin', elem);
}

function addAttributes(elem, attrs) {
	if (attrs === null || attrs === undefined) attrs = {};
	elem.ls = elem.ls || {};
	const attrsToListen = [];

	for (const entry of Object.entries(attrs)) {
		const attr = entry[0];
		const value = entry[1];

		if (attr.startsWith('on') && typeof value === 'function') {
			elem.addEventListener(attr.substr(2), value);
		} else {
			if (elem[attr] === undefined && value) {
				setAttributeValue(elem, value, attr);
			} else {
				attrsToListen.push(attr);
				if (attr === 'className' && !value) {
					setAttributeValue(elem, undefined, 'class');
				} else if (attr === 'style') {
					Object.keys(value).forEach(styleKey => {
						elem.style[styleKey] = value[styleKey];
					});
				} else {
					try {
						elem[attr] = value;
					} catch (_) {//For readonly values only set attribute
						setAttributeValue(elem, value, attr);
					}
				}
			}
		}
	}
	elem.ls.attrsToListen = attrsToListen;
}

const createAndAppendSVG = (_tag, attrs, ...children) => {
	const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	addAttributes(element, attrs);

	for (const child of children) {
		const childElement = document.createElementNS('http://www.w3.org/2000/svg', child.nodeName.toLowerCase());

		for (const attribute of child.attributes) {
			childElement.setAttributeNS(null, attribute.nodeName, attribute.nodeValue);
		}

		appendChild(element, childElement);
	}

	return element;
};