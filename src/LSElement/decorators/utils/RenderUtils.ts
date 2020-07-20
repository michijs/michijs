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

function updateElement(newElement: Element, currentElement: Element, parent: Element | DocumentFragment) {
	if (currentElement.tagName !== newElement.tagName) {
		parent.replaceChild(newElement, currentElement);
	} else {
		if (currentElement.outerHTML === newElement.outerHTML) return true;
		updateAttributes(currentElement, newElement);
		if (currentElement.outerHTML === newElement.outerHTML) return true;
		if (newElement.children.length > 0) {
			updateChangesInElement(Array.from(newElement.children), Array.from(currentElement.children), currentElement);
		} else if (newElement.constructor.name !== 'HTMLElement') {
			console.log('pase')
			currentElement.textContent = newElement.textContent;
		}
	}
}

function updateChildrens(newChildrens: Element[], parent: Element | DocumentFragment) {
	for (let i = 0; i < newChildrens.length; i++) {
		updateElement(newChildrens[i], parent.children.namedItem(newChildrens[i].id), parent);
	}
}

function removeChildrens(childsToRemove: Element[], parent: Element | DocumentFragment) {
	childsToRemove.forEach(child => parent.removeChild(child));
}

function insertNewChildrens(childsToAdd: ChildrensToAddType[], parent: Element | DocumentFragment) {
	childsToAdd.forEach(child => {
		if (!child.index) child.index = 0;
		if (child.index >= parent.children.length) {
			parent.appendChild(child.element);
		} else {
			parent.insertBefore(child.element, parent.children[child.index]);
		}
	});
}

type ChildrensToAddType = {
	element: Element;
	index: number;
};

function updateChangesInElement(newChildrens: Element[], oldChildrens: Element[], parent: Element | DocumentFragment) {
	const newChildrensIds = newChildrens.map(x => x.id);
	const oldChildrensIds = oldChildrens.map(x => x.id);
	const childsToRemove = oldChildrens.filter(x => !newChildrensIds.includes(x.id));
	const childsToAdd = newChildrens.map((value, index) => ({ element: value, index: index })).filter(x => !oldChildrensIds.includes(x.element.id));
	const childsToUpdate = newChildrens.filter(x => oldChildrensIds.includes(x.id));

	removeChildrens(childsToRemove, parent);
	updateChildrens(childsToUpdate, parent);
	insertNewChildrens(childsToAdd, parent);
}

export function updateChangesInDom(self: LSCustomElement) {
	const newChildrens = render(self);
	const oldChildrens = getChildrens(self);
	const rootNode = getRootNode(self);
	updateChangesInElement(newChildrens, oldChildrens, rootNode);
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
		const result = new Array<Element>();

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

export function importStyles(self: LSCustomElement) {
	const styles: StylesType = self.styles ? self.styles() : undefined;
	if (styles && styles.length > 0) {
		const styleElement = document.createElement('style');
		styleElement.setAttribute('scoped', '');
		styleElement.id = 'ls-style';
		Promise.all(styles).then(styleArray => {
			styleElement.textContent = styleArray.map(x => typeof x === 'string' ? x : x.default).join(' ');
		});
		self.ls.styles = styleElement;
	}
}

function getChildrens(self: LSCustomElement) {
	return Array.from(self.shadowRoot ? self.shadowRoot.children : self.children) as Element[];
}

export function getRootNode(self: LSCustomElement) {
	return (self.shadowRoot ? self.shadowRoot : self) as DocumentFragment;
}