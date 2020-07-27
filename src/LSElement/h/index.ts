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

	if (!(child instanceof Node)) {
		child = document.createTextNode(child.toString());
	}

	elem.appendChild(child);
}

function splitCamelCase(str) {
	return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
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
	}else{
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

	for (const entry of Object.entries(attrs)) {
		const attr = entry[0];
		let value = entry[1];
		if (value === true) elem.setAttribute(attr, attr);
		else if (attr.startsWith('on') && typeof value === 'function') {
			elem.addEventListener(attr.substr(2).toLowerCase(), value);
		} else if (value !== false && value !== null && value !== undefined) {
			if (value instanceof Object) {
				const modifier =
					attr === 'style' ? splitCamelCase : str => str.toLowerCase();

				value = Object.entries(value)
					.map(([key, val]) => `${modifier(key)}: ${val}`)
					.join('; ');
			}

			if (attr === 'className' && value !== '')
				elem.classList.add(
					...value
						.toString()
						.trim()
						.split(' ')
				);
			else elem.setAttribute(attr, value.toString());
		}
	}
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