import { nodeIsHTMLElement } from '../../typeWards/nodeIsHTMLElement';
import { LSCustomElement, ObjectJSXElement } from '../../types';

export function findElement(parent: HTMLElement, movedElements: DocumentFragment, jsxElement: ObjectJSXElement, currentIndex: number, rootElement: DocumentFragment | undefined): [boolean, boolean, LSCustomElement] {
  const movedElement = movedElements.getElementById(jsxElement.attrs.id);
  if (movedElement)
    return [true, true, movedElement as LSCustomElement];

  const childNodeAtIndex = parent.childNodes.item(currentIndex);
  if (nodeIsHTMLElement(childNodeAtIndex) && childNodeAtIndex.id === jsxElement.attrs.id) {
    return [false, false, childNodeAtIndex];
  } 
  return [true, false, rootElement ? rootElement.getElementById(jsxElement.attrs.id) as LSCustomElement: undefined];
  
}