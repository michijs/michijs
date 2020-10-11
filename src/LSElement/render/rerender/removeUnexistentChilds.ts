import { ElementMapChild } from '../../types';

export function removeUnexistentChilds(parent: HTMLElement, newChildrenMap: ElementMapChild[]) {
  const childNodes = parent.childNodes;
  if (newChildrenMap.length < childNodes.length) {
    const childsToRemove = Array.from(childNodes).slice(newChildrenMap.length, childNodes.length);
    childsToRemove.forEach(childToRemove => parent.removeChild(childToRemove));
  }
}
