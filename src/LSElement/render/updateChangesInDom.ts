import type { LSCustomElement } from '../types';
import { render } from './render';
import { getRootNode } from './gerRootNode';

function updateAttributes(newElement: Element, currentElement: Element) {
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
        updateAttributes(newElement, currentElement);
        if (currentElement.outerHTML === newElement.outerHTML) return true;
        if (newElement.children.length > 0) {
            updateChangesInElement(Array.from(newElement.children), Array.from(currentElement.children), currentElement);
        } else if (newElement.constructor.name !== 'HTMLElement') {
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
    const childsToAdd: Array<ChildrensToAddType> = newChildrens.map((value, index) => ({ element: value, index: index })).filter(x => !oldChildrensIds.includes(x.element.id));
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

function getChildrens(self: LSCustomElement) {
	return Array.from(self.shadowRoot ? self.shadowRoot.children : self.children) as Element[];
}
