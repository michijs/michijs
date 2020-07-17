import { LSCustomElement, StylesType } from '../../types';

function updateAttributes(currentElement: Element, newElement: Element) {
	//Remove attributes that doesn´t exists now
	currentElement.getAttributeNames().forEach(attribute => {
		if (!newElement.getAttributeNames().includes(attribute)) {
			currentElement.removeAttribute(attribute);
		}
	});

	//Add and update new attributes
	newElement.getAttributeNames().forEach(attribute => {
		if (currentElement.getAttribute(attribute) !== newElement.getAttribute(attribute)) {
			currentElement.setAttribute(attribute, newElement.getAttribute(attribute));
		}
	});
}

function updateElement(currentElement: Element, newElement: Element, parent: Element) {
	if (!currentElement) {
		return parent.appendChild(newElement);
	}

	if (!newElement) {
		return parent.removeChild(currentElement);
	}

	if (currentElement.tagName !== newElement.tagName) {
		return parent.replaceChild(newElement, currentElement);
	}

	if (currentElement && newElement) {
		if (currentElement.outerHTML === newElement.outerHTML) return true;
		updateAttributes(currentElement, newElement);
		if (currentElement.outerHTML === newElement.outerHTML) return true;
		if (newElement.children.length > 0) {
			updateChildrens(Array.from(newElement.children), Array.from(currentElement.children), currentElement);
		} else if (newElement.constructor.name !== 'HTMLElement') {
			currentElement.textContent = newElement.textContent;
		}
	}
}

export function updateChangesInDom(self: LSCustomElement) {
	const newTemplate = render(self);
	const childrens = getChildrens(self);
	updateChildrens(newTemplate, childrens, getRootNode(self));
}

export function updateChildrens(newTemplate: Element[], currentChildrens: Element[], parent: Element) {
	const maxIndex = currentChildrens.length > newTemplate.length ? currentChildrens.length : newTemplate.length;
	for (let i = 0; i < maxIndex; i++) {
		const currentChildren = i < currentChildrens.length ? currentChildrens[i] : undefined;
		const newChildren = i < newTemplate.length ? newTemplate[i].cloneNode(true) as Element : undefined;
		updateElement(currentChildren, newChildren, parent);
	}
}

export function executeFirstRender(self: LSCustomElement) {
	const renderResult = render(self);
	if (renderResult) {
		renderResult.forEach(element => {
			getRootNode(self).appendChild(element);
		});
	}
}

function render(self: LSCustomElement) {
	const renderResult = self.render();
	if (renderResult) {
		const arrayResult = !Array.isArray(renderResult) ? [renderResult] : renderResult;
		const result = new Array<HTMLElement>();

		for (let i = 0; i < arrayResult.length; i++) {
			const x = arrayResult[i];
			if (x) {
				if (Array.isArray(x)) {
					result.push(...x);
				} else {
					result.push(x);
				}
			}
		}
		if (self.ls.styles) {
			result.push(self.ls.styles);
		}
		return result;
	} else return undefined;
}

export function importStyles(self: LSCustomElement, styles?: StylesType) {
	if (styles && styles.length > 0) {
		const styleElement = document.createElement('style');
		styleElement.setAttribute('scoped', '');
		Promise.all(styles).then(styleArray => {
			styleElement.textContent = styleArray.map(x => typeof x === 'string' ? x : x.default).join(' ');
		});
		self.ls.styles = styleElement;
	}
}

export function getChildrens(self: LSCustomElement) {
	return Array.from(self.shadowRoot ? self.shadowRoot.children : self.children);
}

export function getRootNode(self: LSCustomElement): Element {
	return (self.shadowRoot ? self.shadowRoot : self) as Element;
}