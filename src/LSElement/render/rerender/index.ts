import type { ElementMapChild, LSCustomElement } from '../../types';
import { render } from '../render';
import { updateComputedReflectedAttributes } from '../updateComputedReflectedAttributes';
import { tagsAreDifferent } from './tagsAreDifferent';
import { updateChildren } from './updateChildren';
import { removeUnexistentChilds } from './removeUnexistentChilds';
import { isAnElementMap } from '../isAnElementMap';
import { insertChildAt } from './insertChildAt';
import { insertNewChild } from './insertNewChild';
import { updateAttributes } from './updateAttributes';
import { createTextNodeContent } from '../createTextNodeContent';
import { findElement } from './findElement';
import { nodeIsHTMLElement } from './nodeIsHTMLElement';
import { insertNewChildren } from '../insertNewChildren';

export function rerender(self: LSCustomElement) {
  if (self.ls.alreadyRendered) {
    updateComputedReflectedAttributes(self);
    if (self.componentWillUpdate) {
      self.componentWillUpdate();
    }
    const newChildren = render(self);
    const rootElement = (self.shadowRoot ? self.shadowRoot : self.getRootNode()) as DocumentFragment;
    const parent = self.shadowRoot ? self.shadowRoot : self;
    updateElement(rootElement, parent as HTMLElement, newChildren);
    if (self.componentDidUpdate) {
      self.componentDidUpdate();
    }
  }
}

export function updateElement(rootElement: DocumentFragment, parent: HTMLElement, newChildrenMap: ElementMapChild[] = []) {
  for (let i = 0; i < newChildrenMap.length; i++) {
    if (i >= parent.childNodes.length) {
      insertNewChildren(parent, newChildrenMap.slice(i));
      break;
    } else {
      const newChildMap = newChildrenMap[i];
      if (isAnElementMap(newChildMap)) {//Element map is an element
        let oldChild = parent.childNodes[i] as HTMLElement;
        if (!nodeIsHTMLElement(oldChild) || oldChild.id !== newChildMap.attrs.id) {
          oldChild = findElement(rootElement, newChildMap);
          if (oldChild) {//Element in another position -> move to the desired position
            insertChildAt(parent, i, oldChild);
          }
        }
        if (oldChild) {//Node currently exists
          if (tagsAreDifferent(newChildMap, oldChild)) {
            parent.removeChild(oldChild);
            insertNewChild(parent, i, newChildMap);
          }
          updateAttributes(oldChild, newChildMap);
          // You can't tell if the children have changed, it must be the children's responsibility
          updateChildren(rootElement, oldChild, newChildMap.children);
        } else {//Node does not exist
          insertNewChild(parent, i, newChildMap);
        }
      } 
      //Element map is a text node
      else if (nodeIsHTMLElement(parent.childNodes[i])) {//Old child is an element - Create a new text node on his position
        insertNewChild(parent, i, newChildMap);
      } else {//Old child is an text node - I replace his text if it is different
        const newChildText = createTextNodeContent(newChildMap);
        if (parent.childNodes[i].textContent !== newChildText) {//Texts are different - Update text content
          parent.childNodes[i].textContent = newChildText;
        }
      }
      
    }
  }
  removeUnexistentChilds(parent, newChildrenMap);
}

