import { ElementMap } from '../../types';

export function elementExists(rootElement: DocumentFragment, newChild: ElementMap) {
  return rootElement.getElementById(newChild.attrs.id);
}
