import { ElementMap } from '../../types';

export function findElement(rootElement: DocumentFragment, newChild: ElementMap) {
  return rootElement.getElementById(newChild.attrs.id);
}
