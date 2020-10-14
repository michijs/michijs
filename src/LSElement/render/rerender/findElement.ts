import { ElementMap } from '../../types';

export function findElement(rootElement: DocumentFragment, movedElements: DocumentFragment, newChild: ElementMap) {
  return rootElement.getElementById(newChild.attrs.id) || movedElements.getElementById(newChild.attrs.id);
}
