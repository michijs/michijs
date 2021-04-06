import type { ElementMapChild, LSCustomElement } from '../../types';
import { render } from '../render';
import { updateComputedReflectedAttributes } from '../updateComputedReflectedAttributes';
import { tagsAreDifferent } from './tagsAreDifferent';
import { updateChildren } from './updateChildren';
import { removeUnexistentChilds } from './removeUnexistentChilds';
import { isAnElementMap } from '../../typeWards/isAnElementMap';
import { insertChildAt } from './insertChildAt';
import { insertNewChild } from './insertNewChild';
import { createTextNodeContent } from '../createTextNodeContent';
import { findElement } from './findElement';
import { nodeIsHTMLElement } from './nodeIsHTMLElement';
import { insertNewChildren } from '../insertNewChildren';
import { getRootNode } from '../getRootNode';
import { getMountPoint } from '../getMountPoint';
import { setAttributes } from '../setAttributes';

export function rerender(self: LSCustomElement) {
  updateComputedReflectedAttributes(self);
  self.componentWillUpdate?.();
  const newChildren = render(self);
  const rootElement = getRootNode(self);
  const parent = getMountPoint(self) as HTMLElement;
  const movedElements = document.createDocumentFragment();
  updateElement(self, rootElement, movedElements, parent, newChildren);
  self.componentDidUpdate?.();
}

export function updateElement(self: LSCustomElement, rootElement: DocumentFragment, movedElements: DocumentFragment, parent: HTMLElement, newChildrenMap: ElementMapChild[] = []) {
  for (let i = 0; i < newChildrenMap.length; i++) {
    if (i >= parent.childNodes.length + movedElements.childNodes.length) {
      insertNewChildren(self, parent, newChildrenMap.slice(i));
      break;
    } else {
      const newChildMap = newChildrenMap[i];
      if (isAnElementMap(newChildMap)) {//Element map is an element
        let oldChild = parent.childNodes[i] as LSCustomElement;
        const isHTMLElement = nodeIsHTMLElement(oldChild);
        if (!isHTMLElement || oldChild.id !== newChildMap.attrs.id) {
          if (isHTMLElement) {
            movedElements.appendChild(oldChild);//Only save keyeble elements
          }
          oldChild = findElement(rootElement, movedElements, newChildMap) as LSCustomElement;
          if (oldChild) {//Element in another position -> move to the desired position
            insertChildAt(parent, i, oldChild);
          }
        }
        if (oldChild) {//Node currently exists
          if (tagsAreDifferent(newChildMap, oldChild)) {
            parent.removeChild(oldChild);
            insertNewChild(self, parent, i, newChildMap);
          }
          setAttributes(self, oldChild, newChildMap, true);
          // You can't tell if the children have changed, it must be the children's responsibility
          updateChildren(self, rootElement, movedElements, oldChild, newChildMap.children);
        } else {//Node does not exist
          insertNewChild(self, parent, i, newChildMap);
        }
      }
      //Element map is a text node
      else if (nodeIsHTMLElement(parent.childNodes[i])) {//Old child is an element - Create a new text node on his position
        insertNewChild(self, parent, i, newChildMap);
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

