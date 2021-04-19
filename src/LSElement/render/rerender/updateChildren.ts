import { getShadowRoot } from '../../utils/getShadowRoot';
import { LSCustomElement } from '../../types';
import { isCustomElement } from '../../utils/isCustomElement';
import { ElementUpdater } from './index';

export function updateChildren(self: LSCustomElement | DocumentFragment, elementToUpdate: LSCustomElement, jsxElements: JSX.Element[], rootNode: DocumentFragment) {
  if (!elementToUpdate.staticChildren && (!isCustomElement(elementToUpdate) || getShadowRoot(elementToUpdate))) {
    new ElementUpdater(self, elementToUpdate, rootNode).updateElement(jsxElements);
  }
}
