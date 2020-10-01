import type { ElementMap, LSCustomElement } from '../types';
import { render } from './render';
import { updateComputedReflectedAttributes } from './updateComputedReflectedAttributes';
import { createElement } from './createElement';
import { setAttribute } from './setAttribute';
import { isCustomElement } from '../utils/isCustomElement';

function updateAttributes(currentElement: LSCustomElement, newElementMap: ElementMap) {
  const attributesNames = Object.keys(newElementMap.attrs);

  attributesNames.forEach(name => {
    const newValue = newElementMap.attrs[name];
    const oldValue = currentElement.ls.attrsManagedByH[name];
    if (!deepEqual(newValue, oldValue)) {
      if (name === 'style') {
        // TODO: remove only listened styles
        currentElement.removeAttribute('style');
      }
      setAttribute(currentElement, name, newValue);
    }
  });
  currentElement.ls.attrsManagedByH = newElementMap.attrs;
}

function insertNewChild(parent: HTMLElement, index: number, childMap: ElementMap) {
  const newChild = createElement(childMap);
  insertChildAt(parent, index, newChild);
}

function insertChildAt(parent: HTMLElement, index: number, newChild: HTMLElement) {
  if (!index) index = 0;
  if (index >= parent.children.length) {
    parent.appendChild(newChild);
  } else {
    parent.insertBefore(newChild, parent.children[index]);
  }
}

let movedElements: HTMLElement[] = [];

export function rerender(self: LSCustomElement) {
  if (self.ls.alreadyRendered) {
    updateComputedReflectedAttributes(self);
    if (self.componentWillUpdate) {
      self.componentWillUpdate();
    }
    movedElements = [];
    const newChildren = render(self);
    const rootElement = (self.shadowRoot ? self.shadowRoot : self.getRootNode()) as DocumentFragment;
    const parent = self.shadowRoot ? self.shadowRoot : self;
    updateElement(rootElement, parent as HTMLElement, newChildren);
    if (self.componentDidUpdate) {
      self.componentDidUpdate();
    }
  }
}

function updateElement(rootElement: DocumentFragment, parent: HTMLElement, newChildrenMap: ElementMap[]) {
  for (let i = 0; i < newChildrenMap.length; i++) {
    const newChildMap = newChildrenMap[i];
    const oldChildren = Array.from(parent.children);

    const existentElement = elementExists(rootElement, newChildMap);
    const movedElement = elementWasMoved(newChildMap);
    if (existentElement || movedElement) {
      // @ts-ignore
      let oldChild: HTMLElement = oldChildren[i];

      // If the element was moved reinsert it to the dom
      if (movedElement) {
        oldChild = movedElement;
        insertChildAt(parent, i, movedElement);
      } else if (isInDifferentPosition(newChildMap, oldChild)) {
        oldChild = moveToPosition(rootElement, parent, newChildMap, oldChild);
      }

      // Still have to validate equality
      if (tagsAreDifferent(newChildMap, oldChild)) {
        parent.removeChild(oldChild);
        insertNewChild(parent, i, newChildMap);
        continue;
      }
      if (hasDifferentAttributes(newChildMap, oldChild)) {
        updateAttributes(oldChild, newChildMap);
      }
      // You cannot know if childs changed, it must be sons responsability
      updateChildren(rootElement, oldChild, newChildMap.children);
    } else {
      insertNewChild(parent, i, newChildMap);
    }
  }
  removeUnexistentChilds(parent, newChildrenMap);
}

function elementWasMoved(newChildMap: ElementMap) {
  return movedElements.find(x => x.id === newChildMap.attrs.id);
}

function removeUnexistentChilds(parent: HTMLElement, newChildrenMap: ElementMap[]) {
  if (newChildrenMap.length < parent.children.length) {
    const childsToRemove = Array.from(parent.children).slice(newChildrenMap.length, parent.children.length);
    childsToRemove.forEach(childToRemove => parent.removeChild(childToRemove));
  }
}

function updateChildren(rootElement: DocumentFragment, parent: HTMLElement, newChildrenMap: ElementMap[] | string[]) {
  const isACustomElement = isCustomElement(parent);
  const hasShadowRoot = parent.shadowRoot;

  if (!isACustomElement || (isACustomElement && hasShadowRoot)) {
    if (newChildrenMap.length === 1 && typeof newChildrenMap[0] !== 'object') {
      const newInnerText = newChildrenMap[0].toString();
      if (newInnerText !== parent.innerHTML) {
        parent.innerHTML = newInnerText;
      }
    } else {
      updateElement(rootElement, parent, newChildrenMap as ElementMap[]);
    }
  }
}

function tagsAreDifferent(newChildMap: ElementMap, element: LSCustomElement) {
  return newChildMap.tag.toLowerCase() !== element.tagName.toLowerCase();
}

function hasDifferentAttributes(newChildMap: ElementMap, element: LSCustomElement) {
  return !deepEqual(newChildMap.attrs, element.ls.attrsManagedByH);
}

function moveToPosition(rootElement: DocumentFragment, parent: HTMLElement, childMapToMove: ElementMap, childInThatPosition: HTMLElement) {
  const childToMove: HTMLElement = rootElement.getElementById(childMapToMove.attrs.id);
  movedElements.push(childInThatPosition);
  parent.replaceChild(childToMove, childInThatPosition);
  return childToMove;
}

function isInDifferentPosition(newChildMap: ElementMap, oldChild: HTMLElement) {
  return newChildMap.attrs.id !== oldChild.id;
}

function elementExists(rootElement: DocumentFragment, newChild: ElementMap) {
  return rootElement.getElementById(newChild.attrs.id);
}

function deepEqual(object1, object2) {
  const type = typeof object1;
  const areDifferentTypes = type !== typeof object2;
  if (areDifferentTypes) {
    return false;
  }
  switch (true) {
    case type === 'undefined': return true;
    case type === 'function': {
      return JSON.stringify(object1) === JSON.stringify(object2);
    }
    case type === 'object': {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];

        const areObjects = isObject(val1) && isObject(val2);
        if (
          areObjects && !deepEqual(val1, val2) ||
          !areObjects && val1 !== val2
        ) {
          return false;
        }
      }

      return true;
    }
    default: return object1 === object2;
  }
}

function isObject(object) {
  return object != null && typeof object === 'object';
}