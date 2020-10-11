import type { ElementMapChild, LSCustomElement } from '../../types';
import { render } from '../render';
import { updateComputedReflectedAttributes } from '../updateComputedReflectedAttributes';
import { elementExists } from './elementExists';
import { isInDifferentPosition } from './isInDifferentPosition';
import { moveToPosition } from './moveToPosition';
import { hasDifferentAttributes } from './hasDifferentAttributes';
import { tagsAreDifferent } from './tagsAreDifferent';
import { updateChildren } from './updateChildren';
import { removeUnexistentChilds } from './removeUnexistentChilds';
import { elementWasMoved } from './elementWasMoved';
import { isAnElementMap } from '../isAnElementMap';
import { insertChildAt } from './insertChildAt';
import { insertNewChild } from './insertNewChild';
import { updateAttributes } from './updateAttributes';
import { createTextNodeContent } from '../createTextNodeContent';

export let movedElements: HTMLElement[] = [];

export function rerender(self: LSCustomElement) {
  if (self.ls.alreadyRendered) {
    updateComputedReflectedAttributes(self);
    if (self.componentWillUpdate) {
      self.componentWillUpdate();
    }
    const newChildren = render(self);
    const rootElement = (self.shadowRoot ? self.shadowRoot : self.getRootNode()) as DocumentFragment;
    const parent = self.shadowRoot ? self.shadowRoot : self;
    movedElements = [];
    updateElement(rootElement, parent as HTMLElement, newChildren);
    movedElements = [];
    if (self.componentDidUpdate) {
      self.componentDidUpdate();
    }
  }
}

export function updateElement(rootElement: DocumentFragment, parent: HTMLElement, newChildrenMap: ElementMapChild[]) {
  for (let i = 0; i < newChildrenMap.length; i++) {
    const newChildMap = newChildrenMap[i];
    const oldChildren = Array.from(parent.childNodes);

    if (isAnElementMap(newChildMap)) {
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
    } else {
      const newChildText = createTextNodeContent(newChildMap);
      if (i > oldChildren.length) {
        insertNewChild(parent, i, newChildText);
      } else if (oldChildren[i].textContent !== newChildText) {
        if (oldChildren[i].nodeType === 1) {
          movedElements.push(parent.childNodes.item(i) as HTMLElement);
        }
        parent.childNodes.item(i).replaceWith(newChildText);
      }
    }
  }
  removeUnexistentChilds(parent, newChildrenMap);
}


